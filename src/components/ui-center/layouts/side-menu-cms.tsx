/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/prefer-optional-chain */
/* eslint-disable @typescript-eslint/ban-types */
import React from "react";
import Column from "../molecules/column";
import Link from "next/link";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { AiOutlineDashboard } from "react-icons/ai";
import { HiMiniBuildingLibrary } from "react-icons/hi2";
import Row from "@ui-center/molecules/row";
import { MdFastfood } from "react-icons/md";
import { TbCategoryFilled } from "react-icons/tb";
import { LuLayoutList } from "react-icons/lu";
import { GiRoastChicken } from "react-icons/gi";
import { IoQrCode } from "react-icons/io5";
import { RiAccountBoxFill } from "react-icons/ri";
import { RiLogoutCircleRFill } from "react-icons/ri";

type Props = {};

const SideMenuCMS = (props: Props) => {
  const { data: sessionData } = useSession();
  const { pathname } = useRouter();
  console.log(
    "%cMyProject%cline:16%cpathname",
    "color:#fff;background:#ee6f57;padding:3px;border-radius:2px",
    "color:#fff;background:#1f3c88;padding:3px;border-radius:2px",
    "color:#fff;background:rgb(248, 147, 29);padding:3px;border-radius:2px",
    pathname,
  );
  const menus = [
    {
      text: "Dashboard",
      icon: <AiOutlineDashboard />,
      url: "/dashboard",
      subMenu: [],
    },
    {
      text: "My Restaurant",
      icon: <HiMiniBuildingLibrary />
      ,
      url: `/restaurant`,
      subMenu: [],
    },
    {
      text: "Menu",
      icon: <MdFastfood />,
      url: `/restaurant/menu`,
    },
    {
      text: "Category",
      icon: <TbCategoryFilled />,
      url: `/restaurant/category`,
    },
    {
      text: "Topping",
      icon: <LuLayoutList />,
      url: `/restaurant/topping`,
    },
    {
      text: "Meat",
      icon: <GiRoastChicken />,
      url: `/restaurant/meat`,
    },
    {
      text: "My QR",
      icon: <IoQrCode />,
      url: "/my-qr",
      subMenu: [],
    },
  ];
  const styleText = `font-normal  hover:text-main font-semibold px-6 py-2 rounded-full transition-all `;
  return (
    <div className="bg-sidebar h-screen p-6 ">
      <Column gap={6} className="divide-y">
        <Column>
          {menus.map((item, key) => (
            <div key={key}>
              {!item.subMenu ? (
                <Link href={item.url}>
                  <Row gap={2} className={`${styleText} ${pathname == item.url ? "!text-main !bg-white font-semibold shadow-sm" : ""}`}>
                    <div className="text-xl">{item.icon}</div>
                    <div>
                      {item.text}
                    </div>
                  </Row>
                </Link>
              ) : (
                <Column>
                  <Link
                    href={item.url}
                    className={`${styleText} ${pathname == item.url ? "!text-main !bg-white font-semibold shadow-sm" : ""}`}
                  >
                    <Row gap={2}>
                      <div className="text-xl">{item.icon}</div>
                      {item.text}
                    </Row>
                  </Link>
                  {item.subMenu.map((sub: any, key) => (
                    <div key={key} className="pl-6">
                      <Link href={sub?.url}>
                        <div className={`${styleText}`}>{sub.text}</div>
                      </Link>
                    </div>
                  ))}
                </Column>
              )}
            </div>
          ))}
        </Column>
        <Column className="pt-6">
          <div>
            <Link href={"/my-account"}>
              <Row
                gap={2}
                className={`${styleText} ${pathname == "/my-account" ? "bg-black text-white" : ""}`}
              >
                <div className="text-xl">
                  <RiAccountBoxFill />
                </div>
                <div>
                  My Account
                </div>
              </Row>
            </Link>
          </div>
          <div>
            <Link href={"/my-qr"}>
              <Row gap={2} className={`${styleText}`}>
                <div className="text-xl">
                  <RiLogoutCircleRFill />
                </div>
                Logout
              </Row>
            </Link>
          </div>
        </Column>
      </Column>
    </div>
  );
};

export default SideMenuCMS;
