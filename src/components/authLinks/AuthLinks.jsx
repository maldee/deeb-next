"use client";
import Link from "next/link";
import styles from "./authLinks.module.css";
import { useState } from "react";
import { signOut, useSession } from "next-auth/react";
import { ThreeDots } from 'react-loader-spinner';

const AuthLinks = () => {
  const [open, setOpen] = useState(false);
  const toggle = () => setOpen(!open);

  const { data: session } = useSession();
  const { status } = useSession();


  return (
    <>

      {status === "loading" ?

        <ThreeDots
          visible={true}
          height="20"
          width="50"
          color="#5778AC"
          radius="9"
          ariaLabel="three-dots-loading"
          wrapperStyle={{}}
          wrapperClass={styles.threedots}
        />
        : status === "unauthenticated" ? (
          <Link href="/signin" className={styles.link}>
            Login
          </Link>
        ) : (
          <>

            {session?.user.role === "admin" ? (

              <>
                <Link href="/write" className={styles.link}>
                  Write
                </Link>
                <Link href="/" className={styles.link} onClick={() => signOut({
                  redirect: true,
                  callbackUrl: `${window.location.origin}/signin`,
                })}>
                  Logout
                </Link>
              </>

            ) : (


              <Link href="/" className={styles.link} onClick={() => signOut({
                redirect: true,
                callbackUrl: `${window.location.origin}/signin`,
              })}>
                Logout
              </Link>
            )}
          </>
        )}



      <div className={styles.burger} onClick={() => setOpen(!open)}>
        <div className={styles.line}></div>
        <div className={styles.line}></div>
        <div className={styles.line}></div>
      </div>
      {open && (
        <div className={styles.responsiveMenu}>
          <div className={styles.col1}>
            <p><Link className={styles.authLink} onClick={toggle} href="/blog">📕 Blog</Link></p><br /><br />
            <p><Link className={styles.authLink} onClick={toggle} href="/classroom">👨‍🏫 Classroom</Link></p><br /><br />
            <p><Link className={styles.authLink} onClick={toggle} href="/dictionary">📚 Dictionary</Link></p><br /><br />

            <p><Link className={styles.authLink} onClick={toggle} href="/chatbits">🐦 Chatbits</Link></p><br /><br />
            <p><Link className={styles.authLink} onClick={toggle} href="/grammars">🧩 Grammars</Link></p><br /><br />
            <p><Link className={styles.authLink} onClick={toggle} href="/cheats">🎯 Cheats</Link></p><br /><br />
          </div>
          <div className={styles.col1}>
            <p><Link className={styles.authLink} onClick={toggle} href="/quizy">🏆 Quizy</Link></p><br /><br />
            <p><Link className={styles.authLink} onClick={toggle} href="/flips">➰ Flips</Link></p><br /><br />
            <p><Link className={styles.authLink} onClick={toggle} href="/qlake">🪐 Qlake</Link></p><br /><br />
            <p><Link className={styles.authLink} onClick={toggle} href="/cloudy">☁️ Cloudy</Link></p><br /><br />
            <p><Link className={styles.authLink} onClick={toggle} href="/notes">🗒️ Notes </Link></p><br /><br />
            <p><Link className={styles.authLink} onClick={toggle} href="/news">📰 News </Link></p><br /><br />
            
          </div>


          {status === "loading" ?
            <ThreeDots
              visible={true}
              height="20"
              width="50"
              color="#5778AC"
              radius="9"
              ariaLabel="three-dots-loading"
              wrapperStyle={{}}
              wrapperClass={styles.threedotsmobile}
            />
            : status === "unauthenticated" ? (
              <Link className={styles.authLinkMain} onClick={toggle} href="/signin">Login</Link>
            ) : (

              <>

            {session?.user.role === "admin" ? (

              <>
                <Link className={styles.authLinkMain} onClick={toggle} href="/write">✏️ Write</Link>
                <Link href="/" className={styles.authLinkLogout} onClick={() => signOut({
                  redirect: true,
                  callbackUrl: `${window.location.origin}/signin`,
                })}>
                  Logout
                </Link>
              </>

            ) : (
              <Link href="/" className={styles.authLinkLogout} onClick={() => signOut({
                redirect: true,
                callbackUrl: `${window.location.origin}/signin`,
              })}>
                Logout
              </Link>
            )}
          </>
            )}
        </div>
      )}
    </>
  );
};

export default AuthLinks;
