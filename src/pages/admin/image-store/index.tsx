/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/prefer-optional-chain */
/* eslint-disable @typescript-eslint/ban-types */
import Row from "@ui-center/molecules/row";
import { StandardDropzone } from "@ui-cms/molecules/standard-dropzone";
import Image from "next/image";
import React from "react";
import { api } from "~/utils/api";

type Props = {};

const ImageStorePage = (props:Props) => {
  const { data: imageData } = api.imageStores.getAll.useQuery();

  return (
    <div>
      <div>
        <StandardDropzone />
      </div>

      <div>
        <div>All image </div>
        <Row className="flex-wrap" gap={6}>
          {imageData && imageData.length
            ? imageData.map((item, key) => (
                <div
                  key={key}
                  className=" relative h-[250px] w-[250px] overflow-hidden rounded-xl bg-slate-600"
                >
                  <Image
                    src={item.url}
                    alt=""
                    fill
                    style={{ objectFit: "contain" }}
                    onError={(_e: any) => {
                      console.log("image error");
                    }}
                    // onError={(e: any) => {
                    //   e.target.src = "/assets/images/error-image.jpg"
                    // }}
                  />
                </div>
              ))
            : ""}
        </Row>
      </div>
    </div>
  );
};

export default ImageStorePage;
