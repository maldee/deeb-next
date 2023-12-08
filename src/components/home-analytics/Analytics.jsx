import React from "react";
import styles from "./analytics.module.css";
import Image from "next/image";
import Link from "next/link";

const Analytics = () => {
  return (
    <div className={styles.analytics}>

    <div>
        <h2 className={styles.analytics1}>10K+</h2>
        <h4 className={styles.analytics2}>Students</h4>
    </div>
    <div>
        <h2 className={styles.analytics1}>500K+</h2>
        <h4 className={styles.analytics2}>Views</h4>
    </div>
    <div>
        <h2 className={styles.analytics1}>20</h2>
        <h4 className={styles.analytics2}>Courses</h4>
    </div>
</div>
  );
};

export default Analytics;
