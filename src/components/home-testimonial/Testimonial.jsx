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
                  
                    <p className={styles.testimonialDes}>Detailed learning materials </p>

                    <div>
                    <p>&quot;Classes that provide very detailed material in term of making UI UX Design starting team making low and hight quality, system designs, using data layout and make prototypes and testing.&quot;</p>
                        <div className={styles.testimonialGrid}>
                            <Image
                                src="/student.jpg"
                                alt=""
                                layout="responsive"
                                width={50}
                                height={50}
                                className={styles.studentImage}
                            />
                            <span className={styles.student}>Nethsara Ekanayake - Student at NSBM
                            <h5 >| Software Engineering </h5>
                            </span>
                            
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
