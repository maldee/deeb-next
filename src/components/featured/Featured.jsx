import React from "react";
import styles from "./featured.module.css";
import Image from "next/image";

const Featured = () => {
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>
        <b>TODAY&apos;S THE DAY</b> 
      </h1>
      <h4 className={styles.subTitle}>Discover knowledge and creative ideas.</h4>
     
    </div>
  );
};

export default Featured;
