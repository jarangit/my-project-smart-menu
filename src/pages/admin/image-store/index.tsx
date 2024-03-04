/* eslint-disable @typescript-eslint/ban-types */
import { StandardDropzone } from "@ui-cms/molecules/standard-dropzone";
import React from "react";

type Props = {};

const ImageStorePage = (props: Props) => {
  return (
    <div>
      <div>
        <StandardDropzone />
      </div>
    </div>
  );
};

export default ImageStorePage;
