/* eslint-disable @typescript-eslint/ban-types */
import Column from "@ui-center/molecules/column";
import Grid from "@ui-center/molecules/grid";
import Row from "@ui-center/molecules/row";
import Button from "@ui-cms/atoms/button";
import Input from "@ui-cms/atoms/input";
import React from "react";
import { FaImage } from "react-icons/fa";
import { MdOutlineCloudUpload } from "react-icons/md";

type Props = {};

const FormCreateRestaurant = (props: Props) => {
  return (
    <Column gap={3}>
      <div className="relative mb-20  h-[300px] w-full rounded-xl bg-gray-300">
        <div className="absolute right-4 top-3 cursor-pointer">
          <MdOutlineCloudUpload size={30} />
        </div>
        <div className="absolute -bottom-12 left-6 flex h-36 w-36 cursor-pointer items-center justify-center overflow-hidden rounded-full border-4 border-gray-500 bg-gray-400">
          <Column className="items-center">
            <FaImage size={50} />
            <div>Upload Logo</div>
          </Column>
        </div>
      </div>
      <Grid gap={6} className="grid-cols-1 gap-y-2 md:grid-cols-2">
        <Input
          title="Restaurant name"
          type="text"
          placeholder="Restaurant name"
        />
        <Input title="Facebook URL" type="text" placeholder="Facebook URL" />
        <Input title="LineID" type="text" placeholder="LineID" />
        <Input title="Phone" type="text" placeholder="Phone" />
        <Input
          title="Google map URL"
          type="text"
          placeholder="Google map URL"
        />
      </Grid>
      <Row className={"justify-end"}>
        <Button className="w-fit">Next</Button>
      </Row>
    </Column>
  );
};

export default FormCreateRestaurant;
