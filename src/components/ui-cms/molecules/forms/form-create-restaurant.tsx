/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/non-nullable-type-assertion-style */
/* eslint-disable @typescript-eslint/ban-types */
import Column from "@ui-center/molecules/column";
import Grid from "@ui-center/molecules/grid";
import Row from "@ui-center/molecules/row";
import Button from "@ui-cms/atoms/button";
import Input from "@ui-cms/atoms/input";
import React, { ChangeEvent, useCallback, useState } from "react";
import { FaImage } from "react-icons/fa";
import { MdOutlineCloudUpload } from "react-icons/md";
import { useForm, Controller } from "react-hook-form";
import Image from "next/image";
import { shareFunctionUtils } from "~/utils/share-funtion";
import axios from "axios";
import { api } from "~/utils/api";

type Props = {
  _onSubmit: (data: any) => void
};

type FormValues = {
  name: string;
  facebookUrl: string;
  googleMapUrl: string;
  phone: string;
  lineId: string;
  email: string;
  website: string;
};
const FormCreateRestaurant = ({ _onSubmit }: Props) => {
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<FormValues>();
  const [presignedUrl, setPresignedUrl] = useState<string | null>(null);
  const [logoImage, setLogoImage] = useState({
    rawFile: null,
    preview: '',
    uploadUrl: ''
  });
  const [coverImage, setCoverImage] = useState({
    rawFile: null,
    preview: '',
    uploadUrl: ''
  });
  const fileInputUploadLogoRef = React.createRef<HTMLInputElement>();
  const fileInputUploadCoverRef = React.createRef<HTMLInputElement>();
  const apiUtils = api.useUtils()
  const { mutateAsync: fetchPresignedUrls } =
    api.s3.getStandardUploadPresignedUrl.useMutation();
  const createImageStore = api.imageStores.create.useMutation()
  const onGenerateURL = async (file: File) => {
    let result = ''
    await fetchPresignedUrls({
      key: file.name,
      type: 'menu',
    })
      .then((url) => {

        result = url
      })
      .catch((err) => console.error(err));

    return result
  }
  const handleImageChange = async (
    e: ChangeEvent<HTMLInputElement>,
    type: "LOGO" | "COVER",
  ) => {
    if (type === "LOGO") {
      const rawFile = e.target.files?.[0] as File
      const url: string = await onGenerateURL(rawFile)
      shareFunctionUtils.handleImageChange(e, (file) => setLogoImage({
        rawFile: rawFile as unknown as null,
        preview: file,
        uploadUrl: url
      }));
    }
    if (type === "COVER") {
      const rawFile: File = e.target.files?.[0] as File
      const url: string = await onGenerateURL(rawFile)
      shareFunctionUtils.handleImageChange(e, (file) => setCoverImage({
        rawFile: rawFile as unknown as null,
        preview: file,
        uploadUrl: url
      }));
    }
  };

  const handleButtonClickUpload = (type: "LOGO" | "COVER") => {
    if (type === "LOGO") {
      if (fileInputUploadLogoRef.current) {
        fileInputUploadLogoRef.current.click();
      }
    }
    if (type === "COVER") {
      if (fileInputUploadCoverRef.current) {
        fileInputUploadCoverRef.current.click();
      }
    }
  };
  const onUploadImage = useCallback(async ({
    file,
    presignedUrl,
    typeImage
  }: { file: File, presignedUrl: string, typeImage: string }) => {
    if (presignedUrl) {
      await axios
        .put(presignedUrl, file.slice(), {
          headers: { "Content-Type": file.type },
        })
        .then((response) => {
          console.log(response);
          console.log("Successfully uploaded ", file.name);
        })
        .catch((err) => console.error(err));
      void createImageStore.mutateAsync({
        type: typeImage,
        key: file.name,
        url: file.name
      })
      await apiUtils.s3.getObjects.invalidate();
      return file.name
    }
  }, [, apiUtils.s3.getObjects]);

  const onSubmitForm = async (data: FormValues) => {

    const logoUrl = await onUploadImage({
      file: logoImage.rawFile as unknown as File,
      presignedUrl: logoImage.uploadUrl,
      typeImage: "logo",
    })
    const coverUrl = await onUploadImage({
      file: coverImage.rawFile as unknown as File,
      presignedUrl: coverImage.uploadUrl,
      typeImage: "cover",
    })
    const payload = {
      ...data,
      profileImage: logoUrl,
      coverImage: coverUrl,
    };
    console.log(payload);
    void _onSubmit(payload)
    return;
  };

  return (
    <>
      <form onSubmit={handleSubmit((data) => onSubmitForm(data))}>
        <Column gap={3}>
          <div className="relative mb-20  h-[300px] w-full rounded-xl bg-gray-300">
            {coverImage.preview ? (
              <Image
                src={coverImage.preview}
                alt=""
                fill
                style={{ objectFit: "cover" }}
                className="rounded-xl"
              />
            ) : (
              ""
            )}
            <div
              className="absolute right-4 top-3 cursor-pointer"
              onClick={() => handleButtonClickUpload("COVER")}
            >
              <input
                type="file"
                onChange={(e) => handleImageChange(e, "COVER")}
                className="hidden"
                ref={fileInputUploadCoverRef}
              />
              <span
                className={`${coverImage.preview ? "text-white hover:text-main" : ""}`}
              >
                <MdOutlineCloudUpload size={30} />
              </span>
            </div>
            <div className="absolute -bottom-12 left-6 flex h-36 w-36 cursor-pointer items-center justify-center overflow-hidden rounded-full border-2 border-gray-500 bg-gray-400">
              <Column
                className="items-center"
                onClick={() => handleButtonClickUpload("LOGO")}
              >
                <input
                  type="file"
                  onChange={(e) => handleImageChange(e, "LOGO")}
                  className="hidden"
                  ref={fileInputUploadLogoRef}
                />
                {logoImage.preview ? (
                  <Image
                    src={logoImage.preview}
                    alt=""
                    fill
                    style={{ objectFit: "cover" }}
                  />
                ) : (
                  <Column className="items-center">
                    <FaImage size={50} />
                    <div>Upload Logo</div>
                  </Column>
                )}
              </Column>
            </div>
          </div>
          <Grid gap={6} className="grid-cols-1 gap-y-6 md:grid-cols-2">
            <Controller
              control={control}
              name="name"
              rules={{
                required: "Please enter",
              }}
              render={({ field: { onChange, onBlur, value, ref } }) => (
                <Input
                  onChange={onChange}
                  title="Restaurant name"
                  type="text"
                  placeholder="Restaurant name"
                  isRequired
                  isError={errors?.name ? true : false}
                  errorMessage={errors.name?.message}
                />
              )}
            />
            <Controller
              control={control}
              name="facebookUrl"
              render={({ field: { onChange, onBlur, value, ref } }) => (
                <Input
                  onChange={onChange}
                  title="Facebook URL"
                  type="text"
                  placeholder="Facebook URL"
                />
              )}
            />
            <Controller
              control={control}
              name="lineId"
              render={({ field: { onChange, onBlur, value, ref } }) => (
                <Input
                  onChange={onChange}
                  title="LineID"
                  type="text"
                  placeholder="LineID"
                />
              )}
            />
            <Controller
              control={control}
              name="googleMapUrl"
              render={({ field: { onChange, onBlur, value, ref } }) => (
                <Input
                  onChange={onChange}
                  title="Google Map URL"
                  type="text"
                  placeholder="Google Map URL"
                />
              )}
            />
            <Controller
              control={control}
              name="phone"
              render={({ field: { onChange, onBlur, value, ref } }) => (
                <Input
                  onChange={onChange}
                  title="Phone"
                  type="text"
                  placeholder="Phone"
                />
              )}
            />
            <Controller
              control={control}
              name="email"
              render={({ field: { onChange, onBlur, value, ref } }) => (
                <Input
                  onChange={onChange}
                  title="Email"
                  type="text"
                  placeholder="Email"
                />
              )}
            />
            <Controller
              control={control}
              name="website"
              render={({ field: { onChange, onBlur, value, ref } }) => (
                <Input
                  onChange={onChange}
                  title="Website"
                  type="text"
                  placeholder="Website"
                />
              )}
            />
          </Grid>
          <Row className={"justify-end"}>
            <Button className="w-fit" type="submit">
              Next
            </Button>
          </Row>
        </Column>
      </form>
    </>
  );
};

export default FormCreateRestaurant;
