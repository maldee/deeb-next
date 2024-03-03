'use client'

import { FaSearch } from "react-icons/fa";
import styles from "./news.module.css";
import Image from "next/image";
import { TailSpin } from 'react-loader-spinner';
import NewsSkeleton from "./news.skeleton";
import 'react-loading-skeleton/dist/skeleton.css'
import Link from "next/link";
import React, { useState, useEffect } from 'react';
import ResponsivePagination from 'react-responsive-pagination';
import 'react-responsive-pagination/themes/classic.css'
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

const News = ({ searchParams }) => {

  const page = parseInt(searchParams.page) || 1;

  const [query, setQuery] = useState('')

  const [postCount, setData] = useState();
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    // fetch data
    const dataFetch = async () => {
      const postCount = await (
        await fetch("/api/news/list",
        )
      ).json();

      // set state when the data received
      setData(postCount);
    };

    dataFetch();
  }, []);


  const { data, mutate, isLoading } = useSWR(
    `/api/news?page=${page}&query=${query}`,
    fetcher
  );

  const count = postCount?.length;

  const POST_PER_PAGE = 6;

  const totalPages = Math.ceil(count / POST_PER_PAGE);


  return (
    <div className={styles.container}>

      <h4 className={styles.vision}>Latest News</h4>

      <div className={styles.container}>

        <input className={styles.searchInput} type="text" placeholder="Search news..." onChange={(e) => setQuery(e.target.value)} />
        <button className={styles.searchIcon}>
          <FaSearch />
        </button>

        {data?.news.length > 0 ? (
          <ResponsivePagination
            maxWidth={`50px`}
            current={currentPage}
            total={totalPages}
            onPageChange={setCurrentPage}
          />
        ) : (null)}

        <div className={styles.newsList}>
          {isLoading ?
            <NewsSkeleton count={5} />
            : data?.news.length > 0 ? (
              data?.news?.map((item) => (
                <div key={item.id} className={styles.newsGrid}>

                  <ul className={styles.chatCard}>
                    <div className={styles.imageContainer} >
                      <Image src={item.img} alt="" fill className={styles.image} />
                    </div>
                    <h4>{item.news}</h4>
                    
                    <hr className={styles.horiLine} />
                    
                    <Link className={styles.docLink} href={item.link} target="_blank">{item.link}</Link>
                   
                    <h4 className={styles.desc}>{item.desc}</h4>
                  </ul>

                </div>


              ))) : (
              <h3> 🙄 No results. Try different selection</h3>
            )}

        </div>

      </div>
    </div>
  );
}

export default News;
