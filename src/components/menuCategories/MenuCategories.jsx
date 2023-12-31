import Link from "next/link";
import React from "react";
import styles from "./menuCategories.module.css";

const getData = async () => {
  const res = await fetch(process.env.NEXTAUTH_URL+"/api/categories", {
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error("Failed");
  }

  return res.json();
};

const MenuCategories = async () => {
  const data = await getData();
  return (
   
      <div className={styles.categoryList}>
        {data?.slice(0, 25).map((item) => (
          <Link
            href={`/category?cat=${item.slug}`}
            className={`${styles.categoryItem} ${styles[item.slug]}`}
            key={item.id}
          >
            {item.title}
          </Link>
        ))}
      </div>
    
  );
};

export default MenuCategories;
