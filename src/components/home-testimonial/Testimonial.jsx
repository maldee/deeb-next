import React from "react";
import styles from "./testimonial.module.css";
import Image from "next/image";
import Link from "next/link";

const Testimonial = () => {
  return (
    <div className={styles.testimonial}>

                <div className={styles.testimonialContent}>
                    <h3 className={styles.testimonialTitle}>What our Students Say </h3>
                    <p className={styles.testimonialDes}>Detailed learning materials</p>

                    <div>
                        <div className={styles.testimonialGrid}>
                            <p>Classes that provide very detailed material in term of making UI UX Design starting team making low and hight quality, system designs, using data layout and make prototypes and testing.</p>
                        </div>

                    </div>

                </div>

                <div className={styles.testimonialImg}>
                    <Image src="/social-hash.png" alt="" layout="responsive" width={50} height={50} className={styles.image} />
                </div>
            </div>
  );
};

export default Testimonial;
