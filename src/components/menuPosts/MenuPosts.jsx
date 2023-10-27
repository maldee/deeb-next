import Image from "next/image";
import Link from "next/link";
import React from "react";
import styles from "./menuPosts.module.css"

const getData = async () => {
  const res = await fetch(process.env.NEXTAUTH_URL+"/api/popular", {
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error("Failed");
  }

  return res.json();
};

const MenuPosts = async () => {
  const data = await getData();
  return (
    <div className={styles.items}>
      {data?.map((item) => (
      <Link href="/" className={styles.item}  key={item._id}>
       
        <div className={styles.textContainer}>
          <span className={`${styles.category} ${styles[item.catSlug]}`}>{item.catSlug}</span>
          <h3 className={styles.postTitle}>
          {item.title}
          </h3>
          <div className={styles.detail}>
            <span className={styles.username}>{item.userEmail.split('@')[0]}</span>
            <span className={styles.date}> - {item.createdAt.substring(0,10)}</span>
          </div>
        </div>
      </Link>
       ))}
    
    </div>
  );
};

export default MenuPosts;
