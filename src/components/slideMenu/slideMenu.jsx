import React from "react";
import styles from "./slideMenu.module.css";
import MenuCategories from "../menuCategories/MenuCategories";

const SlideMenu = () => {
  return (
    <div className={styles.container}>
      <button className={styles.slideMenuButtonActivated} >🏠 {'Home'}</button>
      <button className={styles.slideMenuButton} >👨‍🏫 {'Classroom'}</button>
      <button className={styles.slideMenuButton} >🙋 {'Quizy'}</button>
      <button className={styles.slideMenuButton} >💬 {'Chatbits'}</button>
      <button className={styles.slideMenuButton} >🤝 {'qLake'}</button>
      <h1 className={styles.title}>Categories</h1>
      <MenuCategories />
    </div>
  );
};

export default SlideMenu;
