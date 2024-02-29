/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/non-nullable-type-assertion-style */
/* eslint-disable @typescript-eslint/consistent-indexed-object-style */
import { useCallback, useMemo, useState } from "react";
import { useDropzone } from "react-dropzone";
import axios from "axios";
import { api } from "~/utils/api";

// determines the ideal file part size for multipart upload based on file's total size
const calculateChunkSize = (fileSize: number) => {
  const FiveGB = 5 * 2 ** 30;
  const FiveHundredGB = 500 * 2 ** 30;
  const FiveTB = 5 * 2 ** 40;
  if (fileSize <= FiveGB) {
    return 50 * 2 ** 20; // 50MB
  } else if (fileSize <= FiveHundredGB) {
    return 50 * 2 ** 20; // 50MB
  } else if (fileSize <= FiveTB) {
    return Math.ceil(FiveTB / 10000); // use the full 10k allowed parts
  }

  return 500 * 2 ** 20; // 500MB
};

const splitFileIntoParts = (file: File) => {
  const chunkSize = calculateChunkSize(file.size);
  const numberOfChunks = Math.ceil(file.size / chunkSize);
  let chunk = 0;
  const fileParts: File[] = [];
  while (chunk < numberOfChunks) {
    const chunkStart = chunk * chunkSize;
    const chunkEnd = Math.min(file.size, chunkStart + chunkSize);
    const filePartBlob = file.slice(chunkStart, chunkEnd);
    const filePartName = `CHUNK${chunk}-${file.name}`;
    const filePart = new File([filePartBlob], filePartName);
    fileParts.push(filePart);
    chunk += 1;
  }
  const partsAsObj: { [partNumber: number]: File } = {};
  for (let i = 1; i <= fileParts.length; i++) {
    partsAsObj[i] = fileParts[i - 1] as File;
  }
  return partsAsObj;
};

export const MultipartDropzone = () => {
  // presigned URLs for uploading each file part
  const [partPresignedUrls, setPartPresignedUrls] = useState<
    { url: string; partNumber: number, file: File, uploadId: string }[]
  >([]);
  console.log('%cMyProject%cline:47%cpartPresignedUrls', 'color:#fff;background:#ee6f57;padding:3px;border-radius:2px', 'color:#fff;background:#1f3c88;padding:3px;border-radius:2px', 'color:#fff;background:rgb(153, 80, 84);padding:3px;border-radius:2px', partPresignedUrls)
  const [fileParts, setFileParts] = useState<{ [partNumber: number]: File }[]>([]);
  const [uploadId, setUploadId] = useState<string>("");
  console.log('%cMyProject%cline:55%cuploadId', 'color:#fff;background:#ee6f57;padding:3px;border-radius:2px', 'color:#fff;background:#1f3c88;padding:3px;border-radius:2px', 'color:#fff;background:rgb(114, 83, 52);padding:3px;border-radius:2px', uploadId)
  const [submitDisabled, setSubmitDisabled] = useState(true);

  const { mutateAsync: fetchPresignedUrls } =
    api.s3.getMultipartUploadPresignedUrl.useMutation();
  const { mutateAsync: completeUpload } =
    api.s3.completeMultipartUpload.useMutation();
  const apiUtils = api.useUtils();

  const { getRootProps, getInputProps, isDragActive, acceptedFiles } =
    useDropzone({
      // maxFiles: 5,
      // maxSize: 5 * 2 ** 40, // roughly 5TB
      // minSize: 1 * 2 ** 20, // 1MB -> S3 limitation
      multiple: true,
      onDropAccepted: (files, event) => {
        console.log('%cMyProject%cline:68%cfiles', 'color:#fff;background:#ee6f57;padding:3px;border-radius:2px', 'color:#fff;background:#1f3c88;padding:3px;border-radius:2px', 'color:#fff;background:rgb(248, 214, 110);padding:3px;border-radius:2px', files)
        // const file = files[0] as File;
        for (const item of files) {
          console.log('fetch file')
          const parts = splitFileIntoParts(item);
          setFileParts((prev: any) => [...prev, parts]);
          fetchPresignedUrls({
            key: item.name,
            filePartTotal: Object.keys(parts).length,
          })
            .then((response) => {
              if (response) {
                const urls = response.urls.map((data) => ({
                  url: data.url,
                  partNumber: data.partNumber,
                  file: item,
                  uploadId: response.uploadId
                }));
                console.log('%cMyProject%cline:85%curls', 'color:#fff;background:#ee6f57;padding:3px;border-radius:2px', 'color:#fff;background:#1f3c88;padding:3px;border-radius:2px', 'color:#fff;background:rgb(217, 104, 49);padding:3px;border-radius:2px', urls)
                setPartPresignedUrls((prev: any) => [...prev, ...urls]);
                setUploadId(response.uploadId);
                setSubmitDisabled(false);
              }
            })
            .catch((error) => console.error(error));
        }

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
    const uploadPromises: Promise<{
      PartNumber: number;
      ETag: string;
    }>[] = [];
    if (acceptedFiles.length > 0) {
      const key = (acceptedFiles[0] as File).name;
      for (const item of partPresignedUrls) {
        console.log('Upload')
        const file = fileParts[0] as unknown as File;
        console.log('file', item.url)
        try {
          uploadPromises.push(
            axios
              .put(item.url, item.file.slice(), {
                onUploadProgress(progressEvent) {
                  console.log(
                    `part #${item.partNumber} upload progress: ${progressEvent.loaded
                    } of ${progressEvent.total as number} bytes uploaded`
                  );
                },
              })
              .then((response) => ({
                ETag: response.headers.etag as string, // Entity tag for the uploaded object
                PartNumber: item.partNumber,
              }))
          );
          const awaitedUploads = await Promise.all(uploadPromises);
  
          await completeUpload({ parts: awaitedUploads, key, uploadId: item.uploadId as "", type: 'menu' });
          console.log("Successfully uploaded ", key);
          await apiUtils.s3.getObjects.invalidate();
        } catch (error) {
          
        }
      }


      setSubmitDisabled(true);
    }
  }, [
    acceptedFiles,
    apiUtils.s3.getObjects,
    completeUpload,
    fileParts,
    partPresignedUrls,
    uploadId,
  ]);

  return (
    <div className="border">
      <h2 className="text-lg font-semibold">Multipart Upload Dropzone</h2>
      <p className="mb-3">Example dropzone that performs a multipart upload</p>
      <div  {...getRootProps()} className="dropzone-container">
        <input {...getInputProps()} multiple />
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
      <button
        onClick={() => void handleSubmit()}
        disabled={submitDisabled}
        className="submit-button"
      >
        Upload
      </button>
    </div>
  );
};