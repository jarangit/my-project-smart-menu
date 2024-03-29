/* eslint-disable @typescript-eslint/ban-types */
import Column from "@ui-center/molecules/column";
import Grid from "@ui-center/molecules/grid";
import Row from "@ui-center/molecules/row";
import Button from "@ui-cms/atoms/button";
import Input from "@ui-cms/atoms/input";
import React, { ChangeEvent, useState } from "react";
import { FaImage } from "react-icons/fa";
import { MdOutlineCloudUpload } from "react-icons/md";
import { useForm, Controller } from "react-hook-form";
import Image from "next/image";

type Props = {};

type FormValues = {
  name: string;
  facebookUrl: string;
  googleMapUrl: string;
  phone: string;
  lineId: string;
};
const FormCreateRestaurant = (props: Props) => {
  const { handleSubmit, control } = useForm<FormValues>();
  const [logoImage, setLogoImage] = useState("");
  const fileInputRef = React.createRef<HTMLInputElement>();

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    const reader = new FileReader();

    reader.onload = () => {
      setLogoImage(reader.result as string);
    };

    if (file) {
      reader.readAsDataURL(file);
    }
  };
  const handleButtonClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit((data) => console.log(data))}>
        <Column gap={3}>
          <div className="relative mb-20  h-[300px] w-full rounded-xl bg-gray-300">
            <div className="absolute right-4 top-3 cursor-pointer">
              <MdOutlineCloudUpload size={30} />
            </div>
            <div className="absolute -bottom-12 left-6 flex h-36 w-36 cursor-pointer items-center justify-center overflow-hidden rounded-full border-2 border-gray-500 bg-gray-400">
              <Column className="items-center" onClick={handleButtonClick}>
                <input
                  type="file"
                  onChange={handleImageChange}
                  className="hidden"
                  ref={fileInputRef}
                />
                {logoImage ? (
                  <Image
                    src={logoImage}
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
          <Grid gap={6} className="grid-cols-1 gap-y-2 md:grid-cols-2">
            <Controller
              control={control}
              name="name"
              render={({ field: { onChange, onBlur, value, ref } }) => (
                <Input
                  onChange={onChange}
                  title="Restaurant name"
                  type="text"
                  placeholder="Restaurant name"
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
