import Button from "@ui-cms/atomics/button";
import Text from "@ui-cms/atomics/text";
import React from "react";
import { api } from "~/utils/api";

type Props = object;

const CategoryPage = (props:Props) => {
  const { data } = api.categoryStore.getAll.useQuery({});
  console.log(
    "%cMyProject%cline:10%cdata",
    "color:#fff;background:#ee6f57;padding:3px;border-radius:2px",
    "color:#fff;background:#1f3c88;padding:3px;border-radius:2px",
    "color:#fff;background:rgb(227, 160, 93);padding:3px;border-radius:2px",
    data,
  );
  const { mutateAsync: create } = api.categoryStore.create.useMutation();

  const onCreate = async () => {
    console.log('test api')
    // return await create({
    //   name: `ของหวาน`,
    // });
  }
  return (
    <div>
      <Text value="CategoryPage" />
      <Button onClick={() => create({name:'test'})}>Create</Button>
      <table>
        <thead>
          <tr className="border">
            <td className="p-2">header1</td>
            <td className="p-2">header2</td>
          </tr>
        </thead>
        <tbody>
          <tr className="border">
            <td className="p-2">content1</td>
            <td className="p-2">content2</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default CategoryPage;
