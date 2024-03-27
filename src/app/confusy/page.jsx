'use client';

import styles from "./confusy.module.css";
import { FaSearch } from "react-icons/fa";
import 'react-loading-skeleton/dist/skeleton.css'
import ConfusySkeleton from "./confusy.skeleton";

import { TailSpin } from 'react-loader-spinner';
import React, { useState, useEffect } from 'react';
import ResponsivePagination from 'react-responsive-pagination';
import 'react-responsive-pagination/themes/classic.css'
import useSWR from "swr";
import { GoogleTagManager } from "@next/third-parties/google";
import { useCollapse } from 'react-collapsed'

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";

const fetcher = async (url) => {
  const res = await fetch(url);

  const data = await res.json();

  if (!res.ok) {
    const error = new Error(data.message);
    throw error;
  }
  return data;
};

const Confusy = ({ searchParams }) => {

  const { data: session } = useSession();
  const { status } = useSession();

  const router = useRouter();

  const page = parseInt(searchParams.page) || 1;

  const [isExpanded, setExpanded] = useState(false)
  const { getCollapseProps, getToggleProps } = useCollapse({ isExpanded })

  const [selectedLanguage, setLanguage] = useState('Select Language')
  const [selectedCategory, setCategory] = useState('Select Category')


  const [query, setQuery] = useState('')

  const [postCount, setData] = useState();
  const [currentPage, setCurrentPage] = useState(1);



  useEffect(() => {
    // fetch data
    const dataFetch = async () => {
      const postCount = await (
        await fetch(`/api/confusy/list?page=${currentPage}&query=${query}&language=${selectedLanguage}&category=${selectedCategory}`,
        {  cache: 'no-store' })
      ).json();

      // set state when the data received
      setData(postCount);
    };

    dataFetch();
  }, [query, selectedLanguage, selectedCategory]);


  const { data, mutate, isLoading } = useSWR(
    `/api/confusy?page=${currentPage}&query=${query}&language=${selectedLanguage}&category=${selectedCategory}`,
    fetcher
  );

  const count = postCount?.count;

  const POST_PER_PAGE = 10;

  const totalPages = Math.ceil(count / POST_PER_PAGE);

  function handleLanguage(e) {
    setLanguage(e.target.value)
    setCategory('Select Category')
    setQuery(null)
    setCurrentPage(1)
  }

  function handleCategory(e) {
    setCategory(e.target.value)
    setLanguage("Select Language")
    setQuery(null)
    setCurrentPage(1)
  }

  function handleSearch(e) {
    setQuery(e.target.value)
    setLanguage("Select Language")
    setCategory('Select Category')
    setCurrentPage(1)

  }

  function handleTag(e) {
    setQuery(e.target.value)
    setLanguage("Select Language")
    setCategory('Select Category')
    setCurrentPage(1)
  }

  if (status === "unauthenticated" || session?.user.subscription === "Free") {
    router.push("/plans");
  }

  return (
    <div className={styles.container}>
      <GoogleTagManager gtmId="G-LFHZ053M0Z" />
      <input className={styles.searchInput} type="text" placeholder="Search confuses..." value={query} onChange={handleSearch} />

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
          <select className={styles.selectInputLanguage} name="languages" id="languages" onChange={handleLanguage} value={selectedLanguage}>
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
          <div className={styles.emojFilterMobile}>
            Search by
            <ul className={styles.filterEmojList}>
              <button className={styles.emojBtn} onClick={handleTag} value={`*`}>*️⃣</button>
            </ul>
          </div>
        </section>

      </div>

      <div className={styles.webFilters}>
        <select className={styles.selectInputLanguage} name="languages" id="languages" onChange={handleLanguage} value={selectedLanguage}>
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
            : data?.subjects?.map((item) => (
              <option key={item.id} value={item.subject}>{item.subject}</option>
            ))}

        </select>


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
      </div>

      {postCount?.count > 0 ? (
        <ResponsivePagination
          maxWidth={`50px`}
          current={currentPage}
          total={totalPages}
          onPageChange={setCurrentPage}
        />
      ) : (null)}

      <div className={styles.gridList}>
        <div className={styles.phraseList}>
          {isLoading
            ? <ConfusySkeleton count={5} />
            : data?.confuses.length > 0 ? (
              data?.confuses?.map((item) => (
                <div key={item.id} className={styles.container}>
                  <ul className={styles.confuseCard}>
                    <div className={styles.header}>
                      <span className={styles.confuseCat}>{item.category}</span>
                      <h3 className={styles.confuseTitle} key={item.id}> {item.title}</h3>
                    </div>

                    {item.img !== "None" ? (
                    <div className={styles.imageContainer}>
                      <Image src={item.img} alt="" fill className={styles.image} />
                    </div>
                   ) : (null)}

                    <p className={styles.confuseDesc}>{item.desc}</p>

                    <h6 className={styles.confuseSub}>{item.subject}</h6>
                  </ul>
                </div>

              ))) : (
              <h3> 🙄 No results. Try different selection</h3>
            )}
        </div>
        <div className={styles.emojTagList}>
          Tags
          <ul className={styles.tagEmojList}>
            <button className={styles.emojBtn} onClick={handleTag} value={`*`}>*️⃣</button>
          </ul>
        </div>
      </div>
    </div>
  )
}

export default Confusy;