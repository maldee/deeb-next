import React from "react";
import styles from "./categoryList.module.css";
import Link from "next/link";
import Image from "next/image";

const getData = async () => {
  const res = await fetch(process.env.NEXTAUTH_URL + "/api/categories", {
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error("Failed");
  }

  return res.json();
};

const CategoryList = async () => {
  const data = await getData();
  return (
      <div className={styles.categories}>
      {data?.map((item) => (
          <Link
          
            href={`/blog?cat=${item.title}`}
            className={`${styles.categoryItem} ${styles[item.slug]}`}
            key={item._id}
          >
            {item.title}
          </Link>
        ))}
      </div>
  );
};

export default CategoryList;
