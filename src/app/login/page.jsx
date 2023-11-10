"use client";
import { signIn, useSession } from "next-auth/react";
import styles from "./loginPage.module.css";
import { useRouter } from "next/navigation";
import { ColorRing } from 'react-loader-spinner';

const LoginPage = () => {
  const { status } = useSession();

  const router = useRouter();

  if (status === "loading") {
    return <div className={styles.loading}>
      <ColorRing
        visible={true}
        height="40"
        width="40"
        ariaLabel="blocks-loading"
        wrapperStyle={{}}
        wrapperClass="blocks-wrapper"
        colors={['#775aec', '#775aec', '#775aec', '#775aec', '#775aec']}
      />
    </div>;
  }

  if (status === "authenticated") {
    router.push("/")
  }

  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <div className={styles.socialButton} onClick={() => signIn("google")}>
          <img width="50px" alt="Google sign-in"
            src="./btn_google.png" />
          <spna className={styles.signLabel}>Sign in with Google</spna>
        </div>

      </div>
    </div>
  );
};

export default LoginPage;
