'use client'

import styles from "./quizyPage.module.css";

import Link from "next/link";
import { TailSpin } from 'react-loader-spinner';
import 'react-loading-skeleton/dist/skeleton.css'
import QuizySkeleton from "./quizy.skeleton";
import { FaSearch } from "react-icons/fa";
import React, { useState, useEffect } from 'react';
import ResponsivePagination from 'react-responsive-pagination';
import 'react-responsive-pagination/themes/classic.css'
import useSWR from "swr";
import { GoogleTagManager } from "@next/third-parties/google";

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

const Quizy = ({ searchParams }) => {

  const { data: session } = useSession();
  const { status } = useSession();

  const router = useRouter();

  const page = parseInt(searchParams.page) || 1;
  const [selectedSubject, setSubject] = useState('EPS TOPIK Grammar')

  const [query, setQuery] = useState('')
  const [postCount, setData] = useState();
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    // fetch data
    const dataFetch = async () => {
      const postCount = await (
        await fetch(`/api/quizy/list?page=${currentPage}&query=${query}&subject=${selectedSubject}`,
        )
      ).json();

      // set state when the data received
      setData(postCount);
    };

    dataFetch();
  }, [query, selectedSubject]);

  const { data, mutate, isLoading } = useSWR(
    `/api/quizy?page=${currentPage}&query=${query}&subject=${selectedSubject}`,
    fetcher
  );

  const count = postCount?.count;

  const POST_PER_PAGE = 6;

  const totalPages = Math.ceil(count / POST_PER_PAGE);

  function handleSearch(e) {
    setQuery(e.target.value)
    setCurrentPage(1)
  }

  function handleSubject(e) {
    setSubject(e.target.value)
    setCurrentPage(1)
  }

  if (status === "unauthenticated" || session?.user.subscription === "Free") {
    router.push("/plans");
  }

  return (

    <div className={styles.container}>
      <GoogleTagManager gtmId="G-LFHZ053M0Z" />
      <input className={styles.searchInput} type="text" placeholder="Search quiz..." onChange={handleSearch} />

      <button className={styles.searchIcon}>
        <FaSearch />
      </button>

      <select className={styles.selectInput} name="subjects" id="subjects" onChange={handleSubject} value={selectedSubject}>
        <option value='Select Subject'>Select Subject</option>
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

      {postCount?.count > 0 ? (
        <ResponsivePagination
          maxWidth={`50px`}
          current={currentPage}
          total={totalPages}
          onPageChange={setCurrentPage}
        />
      ) : (null)}

      <div className={styles.quizyList}>

        {isLoading ?
          <QuizySkeleton count={5} />
          : data?.quizes.length > 0 ? (
            data?.quizes?.map((item) => (
              <div key={item.id} className={styles.qCard}>

                <h6 key={item.id} className={styles.itemId}>{item.id}</h6>
                <Link className={styles.quizLink} key={item.id} href={`/quizy/${item.id}`} >
                  <h4>{item.title}</h4>
                  <h5 className={styles.qCategory}>{item.quiz.quizSynopsis}</h5>
                </Link>

              </div>
            ))) : (
            <div className={styles.noResults}>
              <h3> 🙄 No results. Try different selection</h3>
            </div>

          )}



      </div>



    </div>
  );

};

export default Quizy;




