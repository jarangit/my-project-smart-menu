import Column from "@ui-center/molecules/column";
import Row from "@ui-center/molecules/row";
import Button from "@ui-cms/atoms/button";
import Input from "@ui-cms/atoms/input";
import Text from "@ui-cms/atoms/text";
import React, { useState } from "react";
import { api } from "~/utils/api";

type Props = object;

const CategoryPage = (props: Props) => {
  const { data, refetch } = api.categoryStore.getAll.useQuery();
  const [categoryInputValue, setCategoryInputValue] = useState("");
  const { mutateAsync: create } = api.categoryStore.create.useMutation({
    onSuccess: async () => {
      await refetch();
    },
  });
  const { mutateAsync: deleteApi } = api.categoryStore.delete.useMutation();

  const onCreate = async (value: string) => {
    return await create({
      name: value,
    });
  };
  return (
    <div>
      <Text value="CategoryPage" />
      <Row gap={2} className="!items-end justify-between border">
        <Input
          placeholder="name category"
          title="Name Category"
          value={categoryInputValue}
          onChange={(e) => setCategoryInputValue(e.target.value)}
        />
        <Button onClick={() => onCreate(categoryInputValue)}>Create</Button>
      </Row>
      <table className="w-full border">
        <thead>
          <tr className="border">
            <td className="p-2">id</td>
            <td className="p-2">name</td>
            <td className="p-2">created</td>
            <td className="p-2">...</td>
          </tr>
        </thead>
        <tbody>
          {data?.length
            ? data.map((item, key) => (
                <React.Fragment key={key}>
                  <tr className="border">
                    <td className="p-2">{item.id}</td>
                    <td className="p-2">{item.name}</td>
                    <td className="p-2">{item.createdAt.toDateString()}</td>
                    <Row className="justify-center">
                      <Button>Update</Button>
                      <Button
                        onClick={async () => {
                          await deleteApi({ id: item.id });
                          await refetch();
                        }}
                      >
                        Delete
                      </Button>
                    </Row>
                  </tr>
                </React.Fragment>
              ))
            : ""}
        </tbody>
      </table>
    </div>
  );
};

export default CategoryPage;
