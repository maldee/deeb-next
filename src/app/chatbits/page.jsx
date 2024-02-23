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
import { GoogleTagManager } from "@next/third-parties/google";


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
  const [selectedUsage, setUsage] = useState('Select Usage')

  const [query, setQuery] = useState('')

  const [postCount, setData] = useState();
  const [currentPage, setCurrentPage] = useState(1);
  const [checked, setChecked] = useState(false);



  useEffect(() => {
    // fetch data
    const dataFetch = async () => {
      const postCount = await (
        await fetch(`/api/chatbits/list?page=${currentPage}&query=${query}&category=${selectedCategory}&usage=${selectedUsage}`,
        )
      ).json();

      // set state when the data received
      setData(postCount);
    };

    dataFetch();
  }, [query, selectedCategory, selectedUsage]);


  const { data, mutate, isLoading } = useSWR(
    `/api/chatbits?page=${currentPage}&query=${query}&category=${selectedCategory}&usage=${selectedUsage}`,
    fetcher
  );

  const count = postCount?.count;

  const POST_PER_PAGE = 10;

  const totalPages = Math.ceil(count / POST_PER_PAGE);

  function handleCategory(e) {
    setCategory(e.target.value)
    setUsage('Select Usage')
    setQuery(null)
  }

  function handleUsage(e) {
    setUsage(e.target.value)
    setCategory('Select Category')
    setQuery(null)
  }

  function handleSearch(e) {
    setQuery(e.target.value)
    setCategory('Select Category')
    setUsage('Select Usage')
  }

  return (
    <div className={styles.container}>
      <GoogleTagManager gtmId="G-LFHZ053M0Z" />
      <input className={styles.searchInput} type="text" placeholder="Search phrase..." value={query} onChange={handleSearch} />

      <button className={styles.searchIcon}>
        <FaSearch />
      </button>

      <select className={styles.selectInputCategory} name="categories" id="categories" onChange={handleCategory} value={selectedCategory}>
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

      <select className={styles.selectInputUsage} name="usages" id="usages" onChange={handleUsage} value={selectedUsage}>
        <option value='Select Usage'>Select Usage</option>
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
          : data?.usages?.map((item) => (
            <option key={item.id} value={item.usage}>{item.usage}</option>
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
                  <h4 className={styles.engp}>{item.eng_p}</h4>
                  <hr className={styles.horiLine} />
                  <h4 className={styles.example}>{item.example.split('-')[0]}</h4>
                  <h4 className={styles.example}>{item.example.split('-')[1]}</h4>
                  <h6 className={styles.chatcat}>{item.category} | {item.language}</h6>

                  {item.note != 'None' ?
                    <div>
                      <p className={styles.diff}>{'Differences ❕'}</p>
                      <p className={styles.diffText}>{item.note}</p>
                    </div>
                    : null
                  }
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