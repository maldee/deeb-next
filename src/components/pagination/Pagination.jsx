"use client";

import React from "react";
import styles from "./pagination.module.css";
import { useRouter } from "next/navigation";

const Pagination = ({ page, pages, hasPrev, hasNext }) => {
  const router = useRouter();

  return (
    <div className={styles.container}>
      <button
        className={styles.buttonNp}
        disabled={!hasPrev}
        onClick={() => router.push(`?page=${page - 1}`)}
      >
        {`<`}
      </button>
      <ul className={styles.pagination}>
        {pages.map((page) => (
          <li
            key={page}
            className={
              page === page ? styles.pageItemActive : styles.pageItem
            }
          >

            <button
              className={styles.button}
              onClick={() => router.push(`?page=${page}`)}
            >
              {page}
            </button>

          </li>
        ))}
      </ul>
      <button
        disabled={!hasNext}
        className={styles.buttonNp}
        onClick={() => router.push(`?page=${page + 1}`)}
      >
        {`>`}
      </button>
    </div>
  );
};

export default Pagination;
