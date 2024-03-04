/* eslint-disable @typescript-eslint/ban-types */
import { useSession } from "next-auth/react";
import React from "react";
import LandingLayout from "./landing-layout";
import CMSLayout from "./cms-layout";
import { useRouter } from "next/router";
import AdminLayout from "./admin-layout";

type Props = {
  children: JSX.Element;
};

const LayoutWrapper = ({ children }: Props) => {
  const router = useRouter();

  const findAdminInPath = (path: string) => {
    const regex = /\/admin\//; // สร้าง Regex เพื่อค้นหาคำว่า "admin" ในข้อความ
    return regex.test(path); // ทดสอบว่าคำว่า "admin" อยู่ในข้อความหรือไม่
  };

  const isAdmin = findAdminInPath(router.asPath);

  const { data: sessionData } = useSession();
  if (!sessionData?.user) {
    return <LandingLayout>{children}</LandingLayout>;
  }
  if (isAdmin) {
    return <AdminLayout>{children}</AdminLayout>;
  }
  return (
    <div>
      <CMSLayout>{children}</CMSLayout>
    </div>
  );
};

export default LayoutWrapper;
