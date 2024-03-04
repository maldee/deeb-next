import CardList from "../../components/cardList/CardList";
import styles from "./categoryPage.module.css";
import Menu from "../../components/Menu/Menu";

const Category = ({ searchParams }) => {
  const page = parseInt(searchParams.page) || 1;
  const { cat } = searchParams;

  return (
    <div className={styles.container}>
      <h4 ><span className={styles.title}>Category: </span>{cat}</h4>
      <div className={styles.content}>
        <CardList page={page} cat={cat}/>
        <Menu />
      </div>
    </div>
  );
};

export default Category;
