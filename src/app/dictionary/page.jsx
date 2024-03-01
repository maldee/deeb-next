'use client';

import styles from "./dictionary.module.css";
import { FaSearch } from "react-icons/fa";
import 'react-loading-skeleton/dist/skeleton.css'
import DictionarySkeleton from "./dictionary.skeleton";

import { TailSpin } from 'react-loader-spinner';
import React, { useState, useEffect } from 'react';
import ResponsivePagination from 'react-responsive-pagination';
import 'react-responsive-pagination/themes/classic.css'
import useSWR from "swr";
import { GoogleTagManager  } from "@next/third-parties/google";

const fetcher = async (url) => {
  const res = await fetch(url);

  const data = await res.json();

  if (!res.ok) {
    const error = new Error(data.message);
    throw error;
  }
  return data;
};

const Dictionary = ({ searchParams }) => {

  const page = parseInt(searchParams.page) || 1;

  const [selectedLanguage, setLanguage] = useState('Select Language')
  const [selectedCategory, setCategory] = useState('Select Category')
  
  const [query, setQuery] = useState('')

  const [postCount, setData] = useState();
  const [currentPage, setCurrentPage] = useState(1);



  useEffect(() => {
    // fetch data
    const dataFetch = async () => {
      const postCount = await (
        await fetch(`/api/dictionary/list?page=${currentPage}&query=${query}&language=${selectedLanguage}&category=${selectedCategory}`,
        )
      ).json();

      // set state when the data received
      setData(postCount);
    };

    dataFetch();
  }, [query, selectedLanguage,selectedCategory]);


  const { data, mutate, isLoading } = useSWR(
    `/api/dictionary?page=${currentPage}&query=${query}&language=${selectedLanguage}&category=${selectedCategory}`,
    fetcher
  );

  const count = postCount?.count;

  const POST_PER_PAGE = 10;

  const totalPages = Math.ceil(count / POST_PER_PAGE);

  function handleLanguage(e) {
    setLanguage(e.target.value)
  
  }

  function handleCategory(e) {
    setCategory(e.target.value)
  }


  function handleSearch(e) {
    setQuery(e.target.value)
  }

  return (
    <div className={styles.container}>
      <GoogleTagManager gtmId="G-LFHZ053M0Z" />
      <input className={styles.searchInput} type="text" placeholder="Search word..." value={query} onChange={handleSearch} />

      <button className={styles.searchIcon}>
        <FaSearch />
      </button>

      <select className={styles.selectInputCategory} name="languages" id="languages" onChange={handleLanguage} value={selectedLanguage}>
        <option value='Select Language'>Select Language</option>
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
          : data?.languages?.map((item) => (
            <option key={item.id} value={item.language}>{item.language}</option>
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
          ? <DictionarySkeleton count={5} />
          : data?.words.length > 0 ? (
            data?.words?.map((item) => (
              <div key={item.id} className={styles.container}>
                <ul className={styles.chatCard}>
                  <h3 key={item.id}>{item.word}</h3>
                  <h4 className={styles.engp}>{item.sin_w}</h4>
                  <hr className={styles.horiLine} />
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

export default Dictionary;