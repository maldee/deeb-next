import React from "react";
import styles from "./subscribe.module.css";
import Image from "next/image";
import Link from "next/link";

const Subscribe = () => {
  return (
    <div className={styles.subscribe}>
    <div className={styles.subscribeHead}>
        <h4 className={styles.subscribeHead1}>Subscribe to Our News Letter</h4>
        <p>Subscribe to our newsletter to get information about our courses.</p>
    </div>

    <div className={styles.subscribeBody}>
        <input className={styles.subscribeInput} type="text"></input>
        <button className={styles.subscribeBtn}>
            Subscribe
        </button>
    </div>
</div>
  );
};

export default Subscribe;
