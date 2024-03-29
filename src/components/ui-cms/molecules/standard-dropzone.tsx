/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/non-nullable-type-assertion-style */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import { useCallback, useMemo, useState } from "react";
import { useDropzone } from "react-dropzone";
import axios from "axios";
import { api } from "~/utils/api";
import { env } from "~/env";
import Button from "@ui-cms/atoms/button";


export const StandardDropzone = () => {
  const [presignedUrl, setPresignedUrl] = useState<string | null>(null);
  const { mutateAsync: fetchPresignedUrls } =
    api.s3.getStandardUploadPresignedUrl.useMutation();
  const createImageStore = api.imageStores.create.useMutation()
  const [submitDisabled, setSubmitDisabled] = useState(true);
  const apiUtils = api.useUtils()

  const { getRootProps, getInputProps, isDragActive, acceptedFiles } =
    useDropzone({

      multiple: false,
      onDropAccepted: (files, _event) => {
        const file = files[0] as File;

        fetchPresignedUrls({
          key: file.name,
          type: 'menu',
        })
          .then((url) => {
            setPresignedUrl(url);
            setSubmitDisabled(false);
          })
          .catch((err) => console.error(err));
      },
    });

  const files = useMemo(() => {
    if (!submitDisabled)
      return acceptedFiles.map((file) => (
        <li key={file.name}>
          {file.name} - {file.size} bytes
        </li>
      ));
    return null;
  }, [acceptedFiles, submitDisabled]);

  const handleSubmit = useCallback(async () => {
    if (acceptedFiles.length > 0 && presignedUrl !== null) {
      const file = acceptedFiles[0] as File;
      await axios
        .put(presignedUrl, file.slice(), {
          headers: { "Content-Type": file.type },
        })
        .then((response) => {
          console.log(response);
          console.log("Successfully uploaded ", file.name);

        })
        .catch((err) => console.error(err));
      setSubmitDisabled(true);
      void createImageStore.mutateAsync({
        type: 'cat',
        key: file.name,
        url: file.name
      })
      await apiUtils.s3.getObjects.invalidate();
    }
  }, [acceptedFiles, apiUtils.s3.getObjects, presignedUrl]);

  return (
    <section>
      <h2 className="text-lg font-semibold">Standard Dropzone</h2>
      <p className="mb-3">Simple example for uploading one file at a time</p>
      <div {...getRootProps()} className="dropzone-container">
        <input {...getInputProps()} multiple={false} />
        {isDragActive ? (
          <div className="flex h-full items-center justify-center font-semibold">
            <p>Drop the file here...</p>
          </div>
        ) : (
          <div className="flex h-full items-center justify-center font-semibold">
            <p>Drag n drop file here, or click to select files</p>
          </div>
        )}
      </div>
      <aside className="my-2">
        <h4 className="font-semibold text-zinc-400">Files pending upload</h4>
        <ul>{files}</ul>
      </aside>
      <Button
        onClick={() => void handleSubmit()}
        disabled={
          presignedUrl === null || acceptedFiles.length === 0 || submitDisabled
        }
        className="submit-button"
      >
        Upload
      </Button>
    </section>
  );
};