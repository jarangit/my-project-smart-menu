import Loading from "@ui-center/atoms/loading";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { ComponentType } from "react";
import { useDispatch } from "react-redux";
import { setShowLoading } from "~/app-state/redux/features/ui-state.slice";

const withAuth = <P extends object>(Component: ComponentType<P>) => {
  const Auth = (props: P) => {
    const { data: sessionData, status } = useSession();
    const router = useRouter();
    const dispatch = useDispatch();
    if (status === "loading") {
      dispatch(setShowLoading(true));
      return <Loading />;
    }

    if (!sessionData) {
      void router.push("/"); // ถ้าไม่ได้เข้าสู่ระบบให้ redirect ไปยังหน้า login
      return null;
    }
    dispatch(setShowLoading(false));
    return <Component {...props} />;
  };

  return Auth;
};

export default withAuth;
