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
      url: "/dashboard",
      subMenu: [],
    },
    {
      text: "My Restaurant",
      url: `/restaurant`,
      subMenu: [],
    },
    {
      text: "Menu",
      url: `/restaurant/menu`,
    },
    {
      text: "Category",
      url: `/restaurant/category`,
    },
    {
      text: "Topping",
      url: `/restaurant/topping`,
    },
    {
      text: "Meat",
      url: `/restaurant/meat`,
    },
    {
      text: "My QR",
      url: "/my-qr",
      subMenu: [],
    },
  ];
  const styleText = `font-normal  hover:text-main font-semibold px-6 py-2 rounded-full transition-all `;
  return (
    <div className="bg-sidebar h-screen p-6">
      <Column gap={6} className="divide-y">
        <Column>
          {menus.map((item, key) => (
            <div key={key}>
              {!item.subMenu ? (
                <Link href={item.url}>
                  <div
                    className={`${styleText} ${pathname == item.url ? "!text-main !bg-white font-semibold shadow-sm" : ""}`}
                  >
                    {item.text}
                  </div>
                </Link>
              ) : (
                <Column>
                  <Link
                    href={item.url}
                    className={`${styleText} ${pathname == item.url ? "!text-main !bg-white font-semibold shadow-sm" : ""}`}
                  >
                    {item.text}
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
              <div
                className={`${styleText} ${pathname == "/my-account" ? "bg-black text-white" : ""}`}
              >
                My Account
              </div>
            </Link>
          </div>
          <div>
            <Link href={"/my-qr"}>
              <div className={`${styleText}`}>Logout</div>
            </Link>
          </div>
        </Column>
      </Column>
    </div>
  );
};

export default SideMenuCMS;
