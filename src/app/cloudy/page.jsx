'use client'

import { FaSearch } from "react-icons/fa";
import styles from "./cloudy.module.css";
import Image from "next/image";
import { TailSpin } from 'react-loader-spinner';
import CloudySkeleton from "./cloudy.skeleton";
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

const Cloudy = ({ searchParams }) => {

  const page = parseInt(searchParams.page) || 1;

  const [query, setQuery] = useState('')

  const [postCount, setData] = useState();
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    // fetch data
    const dataFetch = async () => {
      const postCount = await (
        await fetch("/api/cloudy/list",
        )
      ).json();

      // set state when the data received
      setData(postCount);
    };

    dataFetch();
  }, []);


  const { data, mutate, isLoading } = useSWR(
    `/api/cloudy?page=${page}&query=${query}`,
    fetcher
  );

  const count = postCount?.length;

  const POST_PER_PAGE = 6;

  const totalPages = Math.ceil(count / POST_PER_PAGE);


  return (
    <div className={styles.container}>

      <h1 className={styles.vision}>-Cloudy</h1>
      <h4 className={styles.vision}>Digital assests repository</h4>

      <div className={styles.container}>

        <input className={styles.searchInput} type="text" placeholder="Search resource..." onChange={(e) => setQuery(e.target.value)} />
        <button className={styles.searchIcon}>
          <FaSearch />
        </button>

        {data?.cloudy.length > 0 ? (
          <ResponsivePagination
            maxWidth={`50px`}
            current={currentPage}
            total={totalPages}
            onPageChange={setCurrentPage}
          />
        ) : (null)}

        <br />

        <div className={styles.videoList}>
          {isLoading ?
            <CloudySkeleton count={5} />
            : data?.cloudy.length > 0 ? (
              data?.cloudy?.map((item) => (
                <div className={styles.cloudyGrid}>

                  <h4>{item.doc}</h4>
                  <Link href={item.link} target="_blank">{item.link}</Link>
                </div>


              ))) : (
              <h3>No results found</h3>
            )}

        </div>

      </div>
    </div>
  );
}

export default Cloudy;
