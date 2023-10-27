import Link from "next/link";
import React from "react";
import styles from "./menuCategories.module.css";
import Image from "next/image";

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
        
       <p>{data.message}</p>
      </div>
 
  );
};

export default MenuCategories;
