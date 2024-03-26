import React from "react";
import styles from "./flows.module.css";
import Image from "next/image";
import Link from "next/link";

const Flows = () => {
  return (
    <div className={styles.flows}>

                <div className={styles.flowHeader}>
                    <h3>Try our Popular Flows</h3>
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
                            <a href={`/grammars`} className={styles.slideLink}>
                                <Image src="/grammars.png" alt="" width={300} height={300} className={styles.slideImage} />
                            </a>
                        </div>
                        <div id="slide-5">
                            <a href={`/cheats`} className={styles.slideLink}>
                                <Image src="/cheats.png" alt="" width={300} height={300} className={styles.slideImage} />
                            </a>
                        </div>
                        <div id="slide-6">
                            <a href={`/qlake`} className={styles.slideLink}>
                                <Image src="/qlake.png" alt="" width={300} height={300} className={styles.slideImage} />
                            </a>
                        </div>
                        <div id="slide-7">
                            <a href={`/confusy`} className={styles.slideLink}>
                                <Image src="/confusy.png" alt="" width={300} height={300} className={styles.slideImage} />
                            </a>
                        </div>
                        <div id="slide-8">
                            <a href={`/flips`} className={styles.slideLink}>
                                <Image src="/flips.png" alt="" width={300} height={300} className={styles.slideImage} />
                            </a>
                        </div>
                        <div id="slide-9">
                            <a href={`/chatbits`} className={styles.slideLink}>
                                <Image src="/chatbits.png" alt="" width={300} height={300} className={styles.slideImage} />
                            </a>
                        </div>
                        <div id="slide-10">
                            <a href={`/notes`} className={styles.slideLink}>
                                <Image src="/notes.png" alt="" width={300} height={300} className={styles.slideImage} />
                            </a>
                        </div>
                        <div id="slide-11">
                            <a href={`https://store.deeflow.com`} className={styles.slideLink}>
                                <Image src="/store.png" alt="" width={300} height={300} className={styles.slideImage} />
                            </a>
                        </div>
                        <div id="slide-12">
                            <a href={`/dictionary`} className={styles.slideLink}>
                                <Image src="/dictionary.png" alt="" width={300} height={300} className={styles.slideImage} />
                            </a>
                        </div>
                        <div id="slide-13">
                            <a href={`/cloudy`} className={styles.slideLink}>
                                <Image src="/cloudy.png" alt="" width={300} height={300} className={styles.slideImage} />
                            </a>
                        </div>
                    </div>
                </div>

            </div>
  );
};

export default Flows;
