import React from "react";
import styles from "./footer.module.css";
import Image from "next/image";
import Link from "next/link";

const Footer = () => {
  return (
    <div className={styles.container}>
      <div className={styles.info}>
        <div className={styles.logo}>
          <Image src="/logo-400.png" alt="lama blog" width={50} height={50} />
          <h1 className={styles.logoText}>deeflow</h1>
        </div>
        <p className={styles.desc}>
           The largest online education platform in Sri Lanka on which students can access tutorials, 
           lectures and pre-recorded videos by experts in various fields.  
           
        </p>
        <div className={styles.icons}>
          <Image src="/facebook.png" alt="" width={18} height={18} />
          <Image src="/instagram.png" alt="" width={18} height={18} />
          <Image src="/tiktok.png" alt="" width={18} height={18} />
          <Image src="/youtube.png" alt="" width={18} height={18} />
        </div>
      </div>
      <div className={styles.links}>
        <div className={styles.list}>
          <span className={styles.listTitle}>Links</span>
          <Link href="/">Homepage</Link>
          <Link href="/blog">Blog</Link>
          <Link href="/about">About</Link>
          <Link href="/contact">Contact</Link>
        </div>
        
        <div className={styles.list}>
          <span className={styles.listTitle}>Social</span>
          <Link href="https://www.facebook.com/deeflowglobal">Facebook</Link>
          <Link href="https://www.instagram.com/deeflowglobal">Instagram</Link>
          <Link href="https://www.youtube.com/channel/UCOj6vB4yL9GLlIyvFl4HBZw">Youtube</Link>
        </div>
      </div>
    </div>
  );
};

export default Footer;
