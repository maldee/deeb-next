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
            <p className={styles.feature}>🤳<span className={styles.featureLabel}> Easy Accessable</span></p>
            <p className={styles.feature}>💰<span className={styles.featureLabel}> More Affordable Cost</span></p>
           
          </div>
          <div className={styles.featureGrid2}>
          <p className={styles.feature}>⏱<span className={styles.featureLabel}> Flexible Study Time</span></p>
          <p className={styles.feature}>👨‍🎓<span className={styles.featureLabel}> Consultation With Mentor</span></p>
          </div>
        </div>

      </div>

    </div>
  );
};

export default Features;
