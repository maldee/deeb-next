import styles from "./about.module.css";
import Image from "next/image";

export const metadata = {
  title: "About | Deeflow",
  description: "The largest online education platform in Sri lanka",
};

export default function About({ searchParams }) {
  const page = parseInt(searchParams.page) || 1;

  return (
    <div className={styles.container}>
      <div className={styles.logoContainer}>
        <img className={styles.logo} src="./deeflow_logo.jpg" />
      </div>
      <br/>
      <div className={styles.container}>
        <h1 className={styles.subTitle}>About Deeflow</h1>
        <span className={styles.aboutDesc} >Deeflow is an Sri Lankan online education platform on which students can access tutorials and lectures pre-recorded by experts in various fields. This site is developed & maintained by a small team with a passion for sharing knowledge with students in Sri Lanka. The purpose of this website is to help Sri Lankans as well as visitors to reach their educational goals. Therefore we have attempted to provide accurate & maximum details of each subject, lesson, and exam.</span>
        <h1 className={styles.subTitle}>Leadership</h1>
        <span className={styles.aboutDesc}>
          Our team is distributed around the world. We have no office, but we come together online each day to build community and improve the knowledge of millions.
        </span>
        <h3 className={styles.subTitle} >Happy living ❤️</h3>
      </div>
    </div>
  );
}
