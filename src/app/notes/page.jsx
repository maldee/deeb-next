'use client';

import styles from "./notes.module.css";
import { FaSearch } from "react-icons/fa";
import 'react-loading-skeleton/dist/skeleton.css'
import NotesSkeleton from "./notes.skeleton";

import { TailSpin } from 'react-loader-spinner';
import React, { useState, useEffect } from 'react';
import ResponsivePagination from 'react-responsive-pagination';
import 'react-responsive-pagination/themes/classic.css'
import useSWR from "swr";
import { GoogleTagManager } from "@next/third-parties/google";
import { useCollapse } from 'react-collapsed'

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

const Notes = ({ searchParams }) => {

  const { data: session } = useSession();
  const { status } = useSession();
  
  const router = useRouter();

  const page = parseInt(searchParams.page) || 1;

  const [isExpanded, setExpanded] = useState(false)
  const { getCollapseProps, getToggleProps } = useCollapse({ isExpanded })
  
  const [selectedSubject, setSubject] = useState('Select Subject / Language')
  const [selectedCategory, setCategory] = useState('Select Category')


  const [query, setQuery] = useState('')

  const [postCount, setData] = useState();
  const [currentPage, setCurrentPage] = useState(1);



  useEffect(() => {
    // fetch data
    const dataFetch = async () => {
      const postCount = await (
        await fetch(`/api/notes/list?page=${currentPage}&query=${query}&subject=${selectedSubject}&category=${selectedCategory}`,
        )
      ).json();

      // set state when the data received
      setData(postCount);
    };

    dataFetch();
  }, [query, selectedSubject, selectedCategory]);


  const { data, mutate, isLoading } = useSWR(
    `/api/notes?page=${currentPage}&query=${query}&subject=${selectedSubject}&category=${selectedCategory}`,
    fetcher
  );

  const count = postCount?.count;

  const POST_PER_PAGE = 10;

  const totalPages = Math.ceil(count / POST_PER_PAGE);

  function handleSubject(e) {
    setSubject(e.target.value)

  }

  function handleCategory(e) {
    setCategory(e.target.value)
    setQuery(null)
  }

  function handleSearch(e) {
    setQuery(e.target.value)
    setCategory('Select Category')
  }

  if (status === "loading") {
    return <div className={styles.loading}>
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
      </div>;
  }

  if (status === "unauthenticated" || session?.user.subscription === "Free") {
    router.push("/plans");
  }

  return (
    <div className={styles.container}>
      <GoogleTagManager gtmId="G-LFHZ053M0Z" />
      <input className={styles.searchInput} type="text" placeholder="Search notes..." value={query} onChange={handleSearch} />

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
          <select className={styles.selectInputLanguage} name="subjects" id="subjects" onChange={handleSubject} value={selectedSubject}>
            <option value='Select Subject / Language'>Select Subject / Language</option>
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
        </section>

      </div>

      <div className={styles.webFilters}>
        <select className={styles.selectInputLanguage} name="subjects" id="subjects" onChange={handleSubject} value={selectedSubject}>
          <option value='Select Subject / Language'>Select Subject / Language</option>
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

      <div className={styles.cheatList}>
        {isLoading
          ? <NotesSkeleton count={5} />
          : data?.notes.length > 0 ? (
            data?.notes?.map((item) => (
              <div key={item.id} className={styles.container}>
                <ul className={styles.noteCard}>
                  <h3 className={styles.noteTitle} key={item.id}><span className={styles.notetag}>{item.category}</span>  {item.title}</h3>
                  <p className={styles.note}>{item.desc}</p>
                  <h6 className={styles.notecat}>{item.subject}</h6>
                </ul>
              </div>

            ))) : (
            <h3> 🙄 No results. Try different selection</h3>
          )}
      </div>
    </div>
  )
}

export default Notes;