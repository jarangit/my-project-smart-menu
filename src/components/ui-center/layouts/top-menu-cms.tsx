/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import React, { useState } from "react";
import Row from "../molecules/row";
import Button from "@ui-cms/atoms/button";
import { env } from "~/env";

const TopMenuCMS = () => {
  const { data: sessionData } = useSession();
  return (
    <div>
      {/* nav */}
      <div className="border-b-2 p-6">
        <Row className="flex  justify-end gap-6">
          <Link href={`/restaurant/dashboard`}>Home</Link>
          <div>
            {sessionData ? (
              <Row gap={4}>
                <div>{sessionData?.user.name}</div>
                <Button onClick={() => signOut()}>Logout</Button>
                <Link href={`/admin/6023`}>
                  <div>Admin</div>
                </Link>
              </Row>
            ) : (
              <Link href={`/login`}>Login</Link>
            )}
          </div>
        </Row>
      </div>
    </div>
  );
};

export default TopMenuCMS;
