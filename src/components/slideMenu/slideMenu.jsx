import React from "react";
import styles from "./slideMenu.module.css";
import MenuCategories from "../menuCategories/MenuCategories";
import Link from "next/link";

const SlideMenu = () => {
  return (
    <div className={styles.container}>
     

      <Link  href="/">
      <button className={styles.slideMenuButtonActivated} >🏠 {'Home'}</button>
      </Link>

      <Link  href="classroom">
      <button className={styles.slideMenuButton} >👨‍🏫 {'Classroom'}</button>
      </Link>

      <Link  href="quizy">
      <button className={styles.slideMenuButton} >🙋 {'Quizy'}</button>
      </Link>
     
      <Link  href="chatbits">
      <button className={styles.slideMenuButton} >💬 {'Chatbits'}</button>
      </Link>

      <Link  href="https://store.deeflow.com">
      <button className={styles.slideMenuButton} >🛒 {'Store'}</button>
      </Link>
     
      <Link  href="qlake">
      <button className={styles.slideMenuButton} >🤝 {'qLake'}</button>
      </Link>
   
      <h1 className={styles.title}>Categories</h1>
      <MenuCategories />
    </div>
  );
};

export default SlideMenu;
