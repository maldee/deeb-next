'use client'

import styles from "./classroomPage.module.css";
import Image from "next/image";
import React from 'react';
import YouTube from 'react-youtube';
import useSWR from "swr";
import { useState, useEffect } from "react"
import Pagination from "./Pagination"; 

export default function Classroom ({ searchParams }){

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
      <Pagination page={page} pages={pages} hasPrev={hasPrev} hasNext={hasNext} />
      <div className={styles.videoList}>
        {data?.videos?.map((item) => (
          <YouTube className={styles.videoList} videoId={item.link} />

        ))}
      </div>

    </div>
  );

}

export async function generateMetadata({ params }) {
  const { slug } = params;

  const data = await getData(slug);

  return {
    openGraph: {
      title: data?.title,
      images: [{ url: data.img }],
      siteName: 'Next.js',
      type: 'website',
    }
  };
}


