import styles from "./plans.module.css";
import Image from "next/image";
import Link from "next/link";

export const metadata = {
  title: "Plans | Deeflow",
  description: "The largest online education platform in Sri lanka",
};

export default function About({ searchParams }) {
  const page = parseInt(searchParams.page) || 1;

  return (
    <div className={styles.container}>
      <div className={styles.logoContainer}>
        <img className={styles.logo} src="./deeflow_logo.jpg" />
      </div>

      <div className={styles.container}>
        <p className={styles.aboutDesc} >Upgrade your plan to Pro</p>
        <br />
        <h1 className={styles.subTitle}>Pro Plan Required</h1>
        <div className={styles.planContent}>

            <div className={styles.planDetails}>
              <img className={styles.plan_logo} src="./pro_plan.jpg" />

            </div>

            <div className={styles.details}>
              <p>✅ Access to 5000+ words dictionary </p>
              <p>✅ infinite Quizes to enhance your result </p>
              <p>✅ Exam Cheatsheets to find anwers quickly </p>
              <p>✅ Detailed Grammar repository with examples</p>
              <p>✅ Easy vocabulary tests for commit to your memory</p>
              <p>✅ Question and answer platform to get support And many more</p>

              <br />
              <div className={styles.upgradeBtn}>
                <Link href="/">
                  <button className={styles.upgradeButtonActivated} >{'Upgrade LKR 3000/yr'}</button>

                </Link>
                <h3 className={styles.wish} >Happy exam ❤️</h3>
              </div>

            </div>
          
        </div>

      </div>
    </div>
  );
}
