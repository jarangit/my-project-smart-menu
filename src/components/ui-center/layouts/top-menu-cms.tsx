/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import React, { useState } from "react";
import Row from "../molecules/row";
import Button from "@ui-cms/atoms/button";
import { env } from "~/env";
import Image from "next/image";

const TopMenuCMS = () => {
  const { data: sessionData } = useSession();
  console.log('%cMyProject%cline:13%csessionData', 'color:#fff;background:#ee6f57;padding:3px;border-radius:2px', 'color:#fff;background:#1f3c88;padding:3px;border-radius:2px', 'color:#fff;background:rgb(96, 143, 159);padding:3px;border-radius:2px', sessionData)
  return (
    <div>
      {/* nav */}
      <div className="text-white p-6">
        <Row className="w-full justify-between">
          <div className="text-2xl font-bold text-main">JR SM</div>
          <Row className="flex  justify-end gap-6 font-medium">
            <Link href={`/dashboard`}>Home</Link>
            <div>
              {sessionData ? (
                <Row gap={4}>
                  {/* <div>{sessionData?.user.name}</div> */}
                  <Link href={`/admin/6023`}>
                    <div>Admin</div>
                  </Link>
                  <Link href={`/my-account`}>
                    <div className="relative w-10 h-10 overflow-hidden  rounded-full">
                      <Image
                        src={sessionData?.user.image as ''}
                        alt=""
                        fill
                        style={{
                          objectFit: 'cover'
                        }}
                      />
                    </div>
                  </Link>
                  {/* <Button onClick={() => signOut()}>Logout</Button> */}

                </Row>
              ) : (
                <Link href={`/login`}>Login</Link>
              )}
            </div>
          </Row>
        </Row>
      </div>
    </div>
  );
};

export default TopMenuCMS;
