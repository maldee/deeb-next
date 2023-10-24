import React from "react";
import styles from "./featured.module.css";
import Image from "next/image";

const Featured = () => {
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>
        <b>TODAY'S THE DAY 🚀</b> Discover new knowledge and creative ideas.
      </h1>
      <div className={styles.post}>
        <div className={styles.imgContainer}>
          <Image src="/p1.jpeg" alt="" fill className={styles.image} />
        </div>
        <div className={styles.textContainer}>
          <h1 className={styles.postTitle}>Lorem ipsum dolor sit amet alim consectetur adipisicing elit.</h1>
          <p className={styles.postDesc}>
          Deeflow is an Sri Lankan online education platform on which students can access tutorials and
           lectures pre-recorded by experts in various fields. This site is developed & maintained by 
           a small team with a passion for sharing knowledge with students in Sri Lanka. The purpose 
           of this website is to help Sri Lankans as well as visitors to reach their educational goals. 
           Therefore we have attempted to provide accurate & maximum details of each subject, lesson, 
           and exam.
          </p>
          <button className={styles.button}>Read More</button>
        </div>
      </div>
    </div>
  );
};

export default Featured;
