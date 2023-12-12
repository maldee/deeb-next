import React from "react";
import styles from "./slideMenu.module.css";
import MenuCategories from "../menuCategories/MenuCategories";
import Link from "next/link";

const SlideMenu = () => {
  return (
    <div className={styles.container}>
     

      <Link  href="/">
      <button className={styles.slideMenuButtonActivated} ><p className={styles.emojSize}>🏠</p> {'Home'}</button>
      </Link>

      <Link  href="classroom">
      <button className={styles.slideMenuButton} ><p className={styles.emojSize}>👨‍🏫</p> {'Classroom'}</button>
      </Link>

      <Link  href="quizy">
      <button className={styles.slideMenuButton} ><p className={styles.emojSize}>🏆</p> {'Quizy'}</button>
      </Link>
     
      <Link  href="chatbits">
      <button className={styles.slideMenuButton} ><p className={styles.emojSize}>💬</p> {'Chatbits'}</button>
      </Link>

      <Link  href="https://store.deeflow.com">
      <button className={styles.slideMenuButton} ><p className={styles.emojSize}>🛒</p> {'Store'}</button>
      </Link>
     
      <Link  href="flips">
      <button className={styles.slideMenuButton} ><p className={styles.emojSize}>➰</p> {'Flips'}</button>
      </Link>

      <Link  href="qlake">
      <button className={styles.slideMenuButton} ><p className={styles.emojSize}>🪐</p> {'QLake'}</button>
      </Link>
   
      <h1 className={styles.title}>Categories</h1>
      <MenuCategories />
    </div>
  );
};

export default SlideMenu;
