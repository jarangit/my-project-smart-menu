import React, { useState } from "react";
import TopMenuCMS from "./top-menu-cms";
import SideMenuCMS from "./side-menu-cms";
import { TbSquareToggle } from "react-icons/tb";
import Loading from "../atoms/loading";
import { VscLayoutSidebarLeft } from "react-icons/vsc";

type Props = {
  children: React.ReactNode;
};

const CMSLayout = ({ children }: Props) => {
  const [isShowSideMenu, setIsShowSideMenu] = useState(true);
  return (
    <div className="">
      <TopMenuCMS />
      <div className="my-container-outside-cms flex">
        <div
          className={`${isShowSideMenu ? "w-0 md:w-2/6 lg:w-1/6" : "w-0"} max-h-[90vh] overflow-hidden border-r-2 transition-all`}
        >
          <SideMenuCMS />
        </div>
        <div
          className={`${isShowSideMenu ? "w-full md:w-5/6" : "w-full"}  relative max-h-[90vh] overflow-y-scroll  p-10 pt-3 transition-all`}
        >
          <div className="min-h-screen">
            {/* <div
              className="absolute left-1 top-3 cursor-pointer text-gray-700"
              onClick={() => setIsShowSideMenu(!isShowSideMenu)}
            >
              <VscLayoutSidebarLeft size={25} />
            </div> */}
            {children}
          </div>
        </div>
      </div>
      <Loading />
    </div>
  );
};

export default CMSLayout;
