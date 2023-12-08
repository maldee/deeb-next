import React from "react";
import styles from "./flows.module.css";
import Image from "next/image";
import Link from "next/link";

const Flows = () => {
  return (
    <div className={styles.flows}>

                <div className={styles.flowHeader}>
                    <h3>Most Popular Flows</h3>
                </div>

                <div className={styles.slider}>

                    <div className={styles.slides} >
                        <div id="slide-1">
                            <a href={`/blog`} className={styles.slideLink}>
                                <Image src="/blog.png" alt="" width={300} height={300} className={styles.slideImage} />
                            </a>
                        </div>
                        <div id="slide-2">
                            <a href={`/classroom`} className={styles.slideLink}>
                                <Image src="/deeclassroom.png" alt="" width={300} height={300} className={styles.slideImage} />
                            </a>
                        </div>

                        <div id="slide-3">
                            <a href={`/quizy`} className={styles.slideLink}>
                                <Image src="/quizy.png" alt="" width={300} height={300} className={styles.slideImage} />
                            </a>
                        </div>
                        <div id="slide-4">
                            <a href={`/qlake`} className={styles.slideLink}>
                                <Image src="/qlake.png" alt="" width={300} height={300} className={styles.slideImage} />
                            </a>
                        </div>
                        <div id="slide-5">
                            <a href={`/chatbits`} className={styles.slideLink}>
                                <Image src="/chatbits.png" alt="" width={300} height={300} className={styles.slideImage} />
                            </a>
                        </div>
                        <div id="slide-6">
                            <a href={`/flips`} className={styles.slideLink}>
                                <Image src="/flips.png" alt="" width={300} height={300} className={styles.slideImage} />
                            </a>
                        </div>
                        <div id="slide-7">
                            <a href={`https://store.deeflow.com`} className={styles.slideLink}>
                                <Image src="/deestore.png" alt="" width={300} height={300} className={styles.slideImage} />
                            </a>
                        </div>
                    </div>
                </div>

            </div>
  );
};

export default Flows;
