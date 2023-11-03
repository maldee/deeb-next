'use client';

import React from "react";
import { useState, useEffect } from "react"
import Posts from './Posts'
import styles from "./searchPage.module.css";
import useSWR from "swr";
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
import SkeletonSearch from "./skeletonSearch";

export default function Search() {
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
    `/api/posts/search?query=${query}`,
    fetcher
  );

  return (
    <div className={styles.search}>
      <input className={styles.searchInput} type="text" placeholder="Search post..." value={query} onChange={(e) => setQuery(e.target.value)} />
      {isLoading
          ? <SkeletonSearch count={5} />
          :data?.map((item) => (
        <Posts item={item} key={item._id}  />
      ))}
    </div>
  )
}