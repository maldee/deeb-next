'use client'

import styles from "./classroomPage.module.css";
import Image from "next/image";
import React from 'react';
import YouTube from 'react-youtube';
import useSWR from "swr";
import { useState, useEffect } from "react"
import Pagination from "./../../components/pagination/Pagination";
import { ColorRing } from 'react-loader-spinner';
import ClassroomSkeleton from "./classroom.skeleton";
import 'react-loading-skeleton/dist/skeleton.css'

// export const metadata = {
//   title: "Classroom | Deeflow",
//   description: "Interactive learning with deeflow",
// };

export default function Classroom({ searchParams }) {

  const page = parseInt(searchParams.page) || 1;

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
    `/api/classroom?page=${page}&query=${query}`,
    fetcher
  );


  const count = data?.count;

  const POST_PER_PAGE = 6;

  const totalPages = Math.ceil(count / POST_PER_PAGE);

  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

  const hasPrev = POST_PER_PAGE * (page - 1) > 0;
  const hasNext = POST_PER_PAGE * (page - 1) + POST_PER_PAGE < count;

  return (

    <div className={styles.container}>
      <input className={styles.searchInput} type="text" placeholder="Search video..." onChange={(e) => setQuery(e.target.value)} />
      
      {data?.videos.length > 0 ? (
          <Pagination page={page} pages={pages} hasPrev={hasPrev} hasNext={hasNext} />
      ):(null)}
      
      
      <div className={styles.videoList}>
        {isLoading ?
          <ClassroomSkeleton count={5} />
          : data?.videos.length > 0 ? (
            data?.videos?.map((item) => (
              <YouTube key={item.id} className={styles.videoList} videoId={item.link} />

            ))) : (
            <h3>No results found</h3>
          )}

      </div>

    </div>
  );

}



