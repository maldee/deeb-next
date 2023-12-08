"use client";
import Link from "next/link";
import styles from "./authLinks.module.css";
import { useState } from "react";
import { signOut, useSession } from "next-auth/react";

const AuthLinks = () => {
  const [open, setOpen] = useState(false);
  const toggle = () => setOpen(!open);
  const { status } = useSession();

  return (
    <>
      {status === "unauthenticated" ? (
        <Link href="/login" className={styles.link}>
          Login
        </Link>
      ) : (
        <>
          <Link href="/write" className={styles.link}>
            Write
          </Link>
          <Link href="/write" className={styles.link} onClick={signOut}>
          Logout
          </Link>
        </>
      )}
      <div className={styles.burger} onClick={() => setOpen(!open)}>
        <div className={styles.line}></div>
        <div className={styles.line}></div>
        <div className={styles.line}></div>
      </div>
      {open && (
        <div className={styles.responsiveMenu}>
          <Link onClick={toggle} href="/blog"> Blog</Link>
          <Link onClick={toggle} href="/classroom"> Classroom</Link>
          <Link onClick={toggle} href="/quizy"> Quizy</Link>
          <Link onClick={toggle} href="/qlake"> Qlake</Link>
          <Link onClick={toggle} href="/chatbits"> Chatbits</Link>
          <Link onClick={toggle} href="/flips"> Flips</Link>
          
          {status === "unauthenticated" ? (
            <Link onClick={toggle} href="/login">Login</Link>
          ) : (
            <>
              <Link onClick={toggle} href="/write">Write</Link>
              <span onClick={toggle} className={styles.linkLogout}>Logout</span>
            </>
          )}
        </div>
      )}
    </>
  );
};

export default AuthLinks;
