'use client';

import React from "react";
import { useState } from "react"
import styles from "./chatbits.module.css";
import { FaSearch } from "react-icons/fa";
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

  return (
    <div className={styles.search}>
      <input className={styles.searchInput} type="text" placeholder="Search phrase..." value={query} onChange={(e) => setQuery(e.target.value)} />

      <button className={styles.searchIcon}>
          <FaSearch />
        </button>

      {isLoading
        ? <ChatbitsSkeleton count={5} />
        : data?.chatbits.length > 0 ? (
          data?.chatbits?.map((item) => (
            <div key={item.id} className={styles.container}>
              <ul className={styles.chatCard}>
                <h3 key={item.id}>{item.phrase}</h3>
                <h4>{item.eng_p}</h4>
                <h6 className={styles.chatcat}>{item.category} | {item.language}</h6>
              </ul>
            </div>

          ))) : (
            <h3> 🙄 No results. Try different selection</h3>
        )}
    </div>
  )
}