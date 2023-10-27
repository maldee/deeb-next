import Link from "next/link";
import React from "react";
import styles from "./menuCategories.module.css";

const fetcher = async (url) => {
  const res = await fetch(url);

  const data = await res.json();

  if (!res.ok) {
    const error = new Error(data.message);
    throw error;
  }

  return data;
};

const MenuCategories = async () => {
  
  const { data, mutate, isLoading } = useSWR(
    `/api/categories`,
    fetcher
  );

  return (
      <div className={styles.categoryList}>
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

export default MenuCategories;
