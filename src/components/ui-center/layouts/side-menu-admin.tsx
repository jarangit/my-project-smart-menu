/* eslint-disable @typescript-eslint/prefer-optional-chain */
/* eslint-disable @typescript-eslint/ban-types */
import React from "react";
import Column from "../molecules/column";
import Link from "next/link";
import { useSession } from "next-auth/react";

type Props = {};

const SideMenuAdmin = (props: Props) => {
  const { data: sessionData } = useSession();
  const menus = [
    {
      text: "Dashboard",
      url: "/admin/6023",
      subMenu: [],
    },
    {
      text: "Category",
      url: "/admin/category",
      subMenu: [],
    },
    {
      text: "Meat",
      url: "/admin/meat",
      subMenu: [],
    },
    {
      text: "Image Store",
      url: "/admin/image-store",
      subMenu: [],
    },
  ];
  const styleText = "font-semibold";
  return (
    <div className="p-6">
      <Column gap={6} className="divide-y">
        <Column gap={6}>
          {menus.map((item, key) => (
            <div key={key}>
              {!item.subMenu.length ? (
                <Link href={item.url}>
                  <div className={`${styleText}`}>{item.text}</div>
                </Link>
              ) : (
                <Column gap={4}>
                  <Link href={item.url} className={`${styleText}`}>
                    {item.text}
                  </Link>
                </Column>
              )}
            </div>
          ))}
        </Column>
        {/* <Column gap={6} className="pt-6">
          <div>
            <Link href={"/my-account"}>
              <div className={`${styleText}`}>My Account</div>
            </Link>
          </div>
          <div>
            <Link href={"/my-qr"}>
              <div className={`${styleText}`}>Logout</div>
            </Link>
          </div>
        </Column> */}
      </Column>
    </div>
  );
};

export default SideMenuAdmin;
