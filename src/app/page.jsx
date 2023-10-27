import Link from "next/link";
import styles from "./homepage.module.css";
import Featured from "@/components/featured/Featured";
import CategoryList from "@/components/categoryList/CategoryList";
import CardList from "@/components/cardList/CardList";
import Menu from "@/components/Menu/Menu";

export default function Home({ searchParams }) {
  const page = parseInt(searchParams.page) || 1;

  return (
    <div className={styles.container}>
      <div className={styles.postList}>
        <div className={styles.postGrid}>
        <Featured />
        <CategoryList />
        <div className={styles.content}>
          <CardList page={page} />
         
        </div>
      </div>
      <Menu />
      </div>
      
    </div>
  );
}
