import styles from "./homepage.module.css";
import Featured from "../components/featured/Featured";
import CardList from "../components/cardList/CardList";
import Menu from "../components/Menu/Menu";
import SlideMenu from "../components/slideMenu/slideMenu";


export default function Home({ searchParams }) {
  const page = parseInt(searchParams.page) || 1;

  return (
    <div className={styles.container}>

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
