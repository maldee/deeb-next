import React from "react";
import styles from "./testimonial.module.css";
import Image from "next/image";
import Link from "next/link";

const Testimonial = () => {
    return (
        <div className={styles.testimonial}>

            <div className={styles.testimonialContent}>
                <h3 className={styles.testimonialTitle}>What our Students Say </h3>
                <div className={styles.testiBox}>
                  
                    <p className={styles.testimonialDes}>Detailed learning materials <span className={styles.emoj}>🌟</span></p>

                    <div>
                    <p>"Classes that provide very detailed material in term of making UI UX Design starting team making low and hight quality, system designs, using data layout and make prototypes and testing."</p>
                        <div className={styles.testimonialGrid}>
                            <Image
                                src="/student.jpg"
                                alt=""
                                width={50}
                                height={50}
                                className={styles.studentImage}
                            />
                            <span className={styles.student}>Nethsara Ekanayake - Student at University of Peradeniya | Software Engineering </span>
                        </div>

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
