import styles from "./blog.module.css";
import Featured from "../../components/featured/Featured";
import CardList from "../../components/cardList/CardList";
import Menu from "../../components/Menu/Menu";
import SlideMenu from "../../components/slideMenu/slideMenu";
import { GoogleTagManager  } from "@next/third-parties/google";

export const metadata = {
  title: "Blog | Deeflow",
  description: "Discover and read articles from writers on any topic",
};

export default function Blog({ searchParams }) {
  const page = parseInt(searchParams.page) || 1;

  return (
    <div className={styles.container}>
      <GoogleTagManager gtmId="G-LFHZ053M0Z" />
      <div className={styles.postList}>
        <SlideMenu />
        <div className={styles.postGrid}>
          <Featured />
          <div className={styles.content}>
            <CardList page={page} />

          </div>
        </div>
        <Menu />
      </div>

    </div>
  );
}
