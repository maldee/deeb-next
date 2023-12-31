'use client';

import styles from "./chatbits.module.css";
import { FaSearch } from "react-icons/fa";
import 'react-loading-skeleton/dist/skeleton.css'
import ChatbitsSkeleton from "./chatbits.skeleton";

import { TailSpin } from 'react-loader-spinner';
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

const Chatbits = ({ searchParams }) => {

  const page = parseInt(searchParams.page) || 1;

  const [selectedCategory, setCategory] = useState('Select Category')
  const [query, setQuery] = useState('')

  const [postCount, setData] = useState();
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    // fetch data
    const dataFetch = async () => {
      const postCount = await (
        await fetch(`/api/chatbits/list?page=${currentPage}&query=${query}&category=${selectedCategory}`,
        )
      ).json();

      // set state when the data received
      setData(postCount);
    };

    dataFetch();
  }, [query, selectedCategory]);


  const { data, mutate, isLoading } = useSWR(
    `/api/chatbits?page=${currentPage}&query=${query}&category=${selectedCategory}`,
    fetcher
  );

  const count = postCount?.count;

  const POST_PER_PAGE = 10;

  const totalPages = Math.ceil(count / POST_PER_PAGE);

  function handleCategory(e){
    setCategory(e.target.value)
    setQuery(null)
  }

  function handleSearch(e){
    setQuery(e.target.value)
    setCategory('Select Category')
  }

  return (
    <div className={styles.container}>
      <input className={styles.searchInput} type="text" placeholder="Search phrase..." value={query} onChange={handleSearch} />

      <button className={styles.searchIcon}>
        <FaSearch />
      </button>

      <select className={styles.selectInput} name="categories" id="categories" onChange={handleCategory} value={selectedCategory}>
        <option value='Select Category'>Select Category</option>
        {isLoading ?
          <TailSpin
            height="40"
            width="40"
            color="#8a2be2"
            ariaLabel="tail-spin-loading"
            radius="1"
            wrapperStyle={{}}
            wrapperClass=""
            visible={true}
          />
          : data?.categories?.map((item) => (
            <option key={item.id} value={item.category}>{item.category}</option>
          ))}

      </select>

      {postCount?.count > 0 ? (
        <ResponsivePagination
          maxWidth={`50px`}
          current={currentPage}
          total={totalPages}
          onPageChange={setCurrentPage}
        />
      ) : (null)}

      <div className={styles.phraseList}>
        {isLoading
          ? <ChatbitsSkeleton count={5} />
          : data?.phrases.length > 0 ? (
            data?.phrases?.map((item) => (
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
    </div>
  )
}

export default Chatbits;