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

const Chatbits = ({ searchParams }) => {

  const page = parseInt(searchParams.page) || 1;

  const [isExpanded, setExpanded] = useState(false)
  const { getCollapseProps, getToggleProps } = useCollapse({ isExpanded })


  const [selectedFormality, setFormality] = useState('Select Formality')
  const [selectedSituation, setSituation] = useState('Select Situation')

  const [query, setQuery] = useState('')

  const [postCount, setData] = useState();
  const [currentPage, setCurrentPage] = useState(1);



  useEffect(() => {
    // fetch data
    const dataFetch = async () => {
      const postCount = await (
        await fetch(`/api/chatbits/list?page=${currentPage}&query=${query}&formality=${selectedFormality}&situation=${selectedSituation}`,
        )
      ).json();

      // set state when the data received
      setData(postCount);
    };

    dataFetch();
  }, [query, selectedFormality, selectedSituation]);


  const { data, mutate, isLoading } = useSWR(
    `/api/chatbits?page=${currentPage}&query=${query}&formality=${selectedFormality}&situation=${selectedSituation}`,
    fetcher
  );

  const count = postCount?.count;

  const POST_PER_PAGE = 10;

  const totalPages = Math.ceil(count / POST_PER_PAGE);

 
  function handleSearch(e) {
    setQuery(e.target.value)
    setFormality("Select Formality")
    setSituation("Select Situation")
    setCurrentPage(1)
  }

  function handleFormality(e) {
    setFormality(e.target.value)
    setSituation("Select Situation")
    setQuery(null)
    setCurrentPage(1)
  }

  function handleSituation(e) {
    setSituation(e.target.value)
    setFormality("Select Formality")
    setQuery(null)
    setCurrentPage(1)
  }

  
  return (
    <div className={styles.container}>
      <GoogleTagManager gtmId="G-LFHZ053M0Z" />
      <input className={styles.searchInput} type="text" placeholder="Search phrase..." value={query} onChange={handleSearch} />

      <button className={styles.searchIcon}>
        <FaSearch />
      </button>

      <br />

      <div className={styles.mobFilters}>
        <button className={styles.filterbtn}
          {...getToggleProps({
            onClick: () => setExpanded((prevExpanded) => !prevExpanded),
          })}
        >
          {isExpanded ? 'Hide Filters' : 'Show Filters'}
        </button>
        <section {...getCollapseProps()}>
         

          <select className={styles.selectInputFormality} name="formalities" id="formalities" onChange={handleFormality} value={selectedFormality}>
            <option value='Select Formality'>Select Formality</option>
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
              : data?.formalities?.map((item) => (
                <option key={item.id} value={item.formality}>{item.formality}</option>
              ))}

          </select>

          <select className={styles.selectInputSituation} name="situations" id="situations" onChange={handleSituation} value={selectedSituation}>
            <option value='Select Situation'>Select Situation</option>
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
              : data?.situations?.map((item) => (
                <option key={item.id} value={item.situation}>{item.situation}</option>
              ))}

          </select>

        </section>
      </div>

      <div className={styles.webFilters}>

        

        <select className={styles.selectInputFormality} name="formalities" id="formalities" onChange={handleFormality} value={selectedFormality}>
          <option value='Select Formality'>Select Formality</option>
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
            : data?.formalities?.map((item) => (
              <option key={item.id} value={item.formality}>{item.formality}</option>
            ))}

        </select>

        <select className={styles.selectInputSituation} name="situations" id="situations" onChange={handleSituation} value={selectedSituation}>
            <option value='Select Situation'>Select Situation</option>
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
              : data?.situations?.map((item) => (
                <option key={item.id} value={item.situation}>{item.situation}</option>
              ))}

          </select>



      </div>

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
                  <h3 key={item.id} className={styles.phrase}>{item.phrase}</h3>
                  <hr className={styles.horiLine} />
                  <h4 className={styles.engp}>{item.eng_p}</h4>
                  <h4 className={styles.engp}>{item.sin_p}</h4>
                  
                  <h4 className={styles.example}>{item.example}</h4>
                  <br/>
                  <div className={styles.details}>
                    <p className={styles.tag}><span className={styles.formality}>Formality: </span> {item.formality}  </p>
                    <p className={styles.tag}><span className={styles.situation}>Situation: </span> {item.situation}  </p>
                    <p className={styles.tag}><span className={styles.note}>Note: </span> {item.note}  </p>
                    <p className={styles.tag}><span className={styles.language}>Language: </span> {item.language}</p>
                  </div>
                </ul>
              </div>

            ))) : (
              
            <h3 className={styles.noResults}> 🙄 No results. Try different selection</h3>
          )}
      </div>
    </div>
  )
}

export default Chatbits;