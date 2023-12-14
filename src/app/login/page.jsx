"use client";

import { signIn, useSession } from "next-auth/react";
import styles from "./loginPage.module.css";
import { useRouter } from "next/navigation";
import { TailSpin } from 'react-loader-spinner';

const LoginPage = () => {
  const { status } = useSession();

  const router = useRouter();

  if (status === "loading") {
    return <div className={styles.loading}>
      <TailSpin
        height="40"
        width="40"
        color="#8a2be2"
        ariaLabel="tail-spin-loading"
        radius="1"
        wrapperStyle={{}}
        wrapperClass=""
        visible={true}
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
          <span className={styles.signLabel}>Sign in with Google</span>
        </div>

      </div>
    </div>
  );
};

export default LoginPage;
