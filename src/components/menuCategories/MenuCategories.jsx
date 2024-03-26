'use client'

import Link from "next/link";
import React from "react";
import styles from "./menuCategories.module.css";
import useSWR from "swr";

const fetcher = async (url) => {
  const res = await fetch(url);

  const data = await res.json();

  if (!res.ok) {
    const error = new Error(data.message);
    throw error;
  }
  return data;
};

const MenuCategories = () => {
  
const { data, mutate, isLoading } = useSWR(
  `/api/categories`,
  fetcher
);

  const categories = data;
  return (
   
      <div className={styles.categoryList}>
        {categories?.slice(0, 25).map((item) => (
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
