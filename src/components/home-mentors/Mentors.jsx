import React from "react";
import styles from "./mentors.module.css";
import Image from "next/image";
import Link from "next/link";

const Mentors = () => {
  return (
    <div className={styles.mentors}>
    <h3 className={styles.mentorsHead}>Our Expert Mentors</h3>
    <div className={styles.mentorsGrid}>
        <div className={styles.mentorsCard}>

            <Image className={styles.mentorImage} src="/gihan.jpg" alt="Avatar" width={300} height={260} />
            <div className={styles.mentorDetails}>
                <h4><b>Gihan</b></h4>
                <p>Architect & Engineer</p>
            </div>


        </div>
        <div className={styles.mentorsCard}>

            <Image className={styles.mentorImage} src="/chanaka.jpg" alt="Avatar" width={300} height={260} />

            <div className={styles.mentorDetails}>
                <h4><b>Chanka</b></h4>
                <p>Occult Science Engineer</p>
            </div>

        </div>
        <div className={styles.mentorsCard}>

            <Image className={styles.mentorImage} src="/dulani.jpg" alt="Avatar" width={300} height={260} />
            <div className={styles.mentorDetails}>
                <h4><b>Dulani</b></h4>
                <p>Social Engineer</p>
            </div>


        </div>
    </div>

</div>
  );
};

export default Mentors;
