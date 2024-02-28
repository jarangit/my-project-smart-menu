import { type Session } from "next-auth";
import { SessionProvider } from "next-auth/react";
import { type AppType } from "next/app";

import { api } from "~/utils/api";

import "~/styles/globals.css";
import LayoutWrapper from "@ui-center/layouts/layout-wrapper";
import { Provider } from 'react-redux'
import { store } from "~/app-state/redux/store";

const MyApp: AppType<{ session: Session | null }> = ({
  Component,
  pageProps: { session, ...pageProps },
}) => {
  return (
    <Provider store={store}>
      <SessionProvider session={session}>
        <LayoutWrapper>
          <Component {...pageProps} />
        </LayoutWrapper>
      </SessionProvider>
    </Provider>
  );
};

export default api.withTRPC(MyApp);
