'use client';

import styles from "./faq.module.css";
import { FaSearch } from "react-icons/fa";
import 'react-loading-skeleton/dist/skeleton.css'
import FAQSkeleton from "./faq.skeleton";

import { TailSpin } from 'react-loader-spinner';
import React, { useState, useEffect } from 'react';
import ResponsivePagination from 'react-responsive-pagination';
import 'react-responsive-pagination/themes/classic.css'
import useSWR from "swr";
import { GoogleTagManager } from "@next/third-parties/google";
import { useCollapse } from 'react-collapsed'

const fetcher = async (url) => {
  const res = await fetch(url);

  const data = await res.json();

  if (!res.ok) {
    const error = new Error(data.message);
    throw error;
  }
  return data;
};

const Cheats = ({ searchParams }) => {

  const page = parseInt(searchParams.page) || 1;

  const [query, setQuery] = useState('')

  const [postCount, setData] = useState();
  const [currentPage, setCurrentPage] = useState(1);



  useEffect(() => {
    // fetch data
    const dataFetch = async () => {
      const postCount = await (
        await fetch(`/api/faqs/list?page=${currentPage}&query=${query}`,
        )
      ).json();

      // set state when the data received
      setData(postCount);
    };

    dataFetch();
  }, [query]);


  const { data, mutate, isLoading } = useSWR(
    `/api/faqs?page=${currentPage}&query=${query}`,
    fetcher
  );

  const count = postCount?.count;

  const POST_PER_PAGE = 10;

  const totalPages = Math.ceil(count / POST_PER_PAGE);

 

  function handleSearch(e) {
    setQuery(e.target.value)
    setCategory('Select Category')
  }

  return (
    <div className={styles.container}>
      <GoogleTagManager gtmId="G-LFHZ053M0Z" />
      <input className={styles.searchInput} type="text" placeholder="Search FAQs..." value={query} onChange={handleSearch} />

      <button className={styles.searchIcon}>
        <FaSearch />
      </button>

      <br />

      {postCount?.count > 0 ? (
        <ResponsivePagination
          maxWidth={`50px`}
          current={currentPage}
          total={totalPages}
          onPageChange={setCurrentPage}
        />
      ) : (null)}

      <div className={styles.faqList}>
        {isLoading
          ? <FAQSkeleton count={5} />
          : data?.faqs.length > 0 ? (
            data?.faqs?.map((item) => (
              <div key={item.id} className={styles.container}>
                <ul className={styles.faqCard}>
                  <h3 key={item.id}>{item.title}</h3>
                  <p className={styles.cheat}>{item.desc}</p>
                </ul>
              </div>

            ))) : (
            <h3> 🙄 No results. Try different selection</h3>
          )}
      </div>
    </div>
  )
}

export default Cheats;