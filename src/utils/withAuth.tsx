import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import { ComponentType } from 'react';

const withAuth = <P extends object>(Component: ComponentType<P>) => {
  const Auth = (props: P) => {
    const { data: sessionData, status } = useSession();
    const router = useRouter();

    if (status === 'loading') {
      return <p>Loading...</p>;
    }

    if (!sessionData) {
      void router.push('/'); // ถ้าไม่ได้เข้าสู่ระบบให้ redirect ไปยังหน้า login
      return null;
    }

    return <Component {...props} />;
  };

  return Auth;
};

export default withAuth;