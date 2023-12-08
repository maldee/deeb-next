import React from "react";
import styles from "./features.module.css";
import Image from "next/image";
import Link from "next/link";

const Features = () => {
  return (
    <div className={styles.features}>

      <div className={styles.featuresImg}>
        <Image src="/learn-enjoy.png" alt="" layout="responsive" width={100} height={100} className={styles.image} />
      </div>
      <div className={styles.featuresContent}>
        <h3 className={styles.featuresTitle}>Make your Learning Enjoyable </h3>
        <p className={styles.featuresDes}>Set the way of learning according to your wishes with some of the benefits that you get us, so you on enjoy the lessons that we provide.</p>

        <div>
          <div className={styles.featureGrid1}>
            <p>Easy Accessable</p>
            <p>More Affordable Cost</p>
          </div>
          <div className={styles.featureGrid2}>
            <p>Flexible Study Time</p>
            <p>Consultation With Mentor</p>
          </div>
        </div>

      </div>

    </div>
  );
};

export default Features;
