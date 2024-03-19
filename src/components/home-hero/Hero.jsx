import React from "react";
import styles from "./hero.module.css";
import Image from "next/image";
import Link from "next/link";

const Hero = () => {
  return (
    <div className={styles.hero}>

      <div className={styles.heroContent}>
        <h3 className={styles.heroTitle}>Flow to the next world </h3>
        <p className={styles.heroDes}>The largest online education platform in Sri Lanka on which students can access tutorials and lectures pre-recorded by experts in various fields. </p>
        <Link className={styles.heroBtn1} href="/signin"> Get Started</Link>
        <Link className={styles.heroBtn2} href="/signin"> Watch Video</Link>
      </div>

      <div className={styles.heroImg}>
        <Image src="/rocket.png" alt="" layout="responsive" width={500} height={300} className={styles.image} />
      </div>

    </div>
  );
};

export default Hero;
