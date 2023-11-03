'use client'

import styles from "./quizyPage.module.css";
import React from 'react';
import useSWR from "swr";
import { useState } from "react"
import Link from "next/link";

export default function Quizy() {

  const [query, setQuery] = useState('')

  const fetcher = async (url) => {

    const res = await fetch(url);

    const data = await res.json();

    if (!res.ok) {
      const error = new Error(data.message);
      throw error;
    }

    console.log(data)
    return data;
  };

  const { data, mutate, isLoading } = useSWR(
    `/api/quizy?query=${query}`,
    fetcher
  );

  return (

    <div className={styles.container}>
      <input className={styles.searchInput} type="text" placeholder="Search quiz..." onChange={(e) => setQuery(e.target.value)} />

      <div className={styles.videoList}>
        <ul>
          {data?.map((item) => (

            <li className={styles.quizLink}>
              <Link key={item.id} href={`/quizy/${item.id}`} >
                <h4>{item.title}</h4>
              </Link>
            </li>

          ))}


        </ul>
      </div>

    </div>
  );

}




