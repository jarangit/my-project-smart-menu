import { type Session } from "next-auth";
import { SessionProvider } from "next-auth/react";
import { type AppType } from "next/app";

import { api } from "~/utils/api";

import "~/styles/globals.css";
import LayoutWrapper from "@ui-center/layouts/layout-wrapper";

const MyApp: AppType<{ session: Session | null }> = ({
  Component,
  pageProps: { session, ...pageProps },
}) => {
  return (
    <SessionProvider session={session}>
      <LayoutWrapper>
        <Component {...pageProps} />
      </LayoutWrapper>
    </SessionProvider>
  );
};

export default api.withTRPC(MyApp);
