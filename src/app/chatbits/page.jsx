'use client';

import React from "react";
import { useState } from "react"
import styles from "./chatbits.module.css";
import useSWR from "swr";
import 'react-loading-skeleton/dist/skeleton.css'
import ChatbitsSkeleton from "./chatbits.skeleton";

// export const metadata = {
//   title: "Chatbits | Deeflow",
//   description: "Word repository of deeflow",
// };

export default function Chatbits() {
  const [query, setQuery] = useState('')

  const fetcher = async (url) => {
    const res = await fetch(url);

    const data = await res.json();

    if (!res.ok) {
      const error = new Error(data.message);
      throw error;
    }

    return data;
  };

  const { data, mutate, isLoading } = useSWR(
    `/api/chatbits?query=${query}`,
    fetcher
  );

  console.log("hello "+data);

  return (
    <div className={styles.search}>
      <input className={styles.searchInput} type="text" placeholder="Search phrase..." value={query} onChange={(e) => setQuery(e.target.value)} />
      {isLoading ? 
      <ChatbitsSkeleton count={5} />
        : data?.chatbits.length > 0 ? (
          data?.chatbits?.map((item) => (
            <div key={item.id} className={styles.container}>
              <ul>
                <h3>{item.phrase}</h3>
                <h4>{item.eng_p}</h4>
                <span className={styles.chatcat}>Category - {item.category} </span>
                <span className={styles.chatlang}>Language - {item.language}</span>
              </ul>
            </div>

          ))) : (
          <h3>No results found</h3>
        )}
    </div>
  )
}