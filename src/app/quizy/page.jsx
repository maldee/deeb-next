'use client'

import styles from "./quizyPage.module.css";

import Link from "next/link";
import { ColorRing } from 'react-loader-spinner';
import 'react-loading-skeleton/dist/skeleton.css'
import QuizySkeleton from "./quizy.skeleton";

import React, { useState ,useEffect} from 'react';
import ResponsivePagination from 'react-responsive-pagination';
import 'react-responsive-pagination/themes/classic.css'
import useSWR from "swr";

// export const metadata = {
//   title: "Quizy | Deeflow",
//   description: "Realtime exam hub of deeflow",
// };

const fetcher = async (url) => {
  const res = await fetch(url);

  const data = await res.json();

  if (!res.ok) {
    const error = new Error(data.message);
    throw error;
  }
  return data;
};

const Quizy = () => {

  const [query, setQuery] = useState('')
  const [postCount, setData] = useState();
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    // fetch data
    const dataFetch = async () => {
      const postCount = await (
        await fetch("/api/quizy/list",
        )
      ).json();

      // set state when the data received
      setData(postCount);
    };

    dataFetch();
  }, []);

  const { data, mutate, isLoading } = useSWR(
    `/api/quizy?query=${query}`,
    fetcher
  );

  const count = postCount?.length;
  
  const POST_PER_PAGE = 5;

  const totalPages = Math.ceil(count / POST_PER_PAGE);

  return (

    <div className={styles.container}>
      <input className={styles.searchInput} type="text" placeholder="Search quiz..." onChange={(e) => setQuery(e.target.value)} />

      <div className={styles.paginationBar}>
        <ResponsivePagination
          maxWidth={`50px`}
          current={currentPage}
          total={totalPages}
          onPageChange={setCurrentPage}
        />
      </div>

      <div className={styles.quizyList}>

        {isLoading ?
          <QuizySkeleton count={5} />
          : data?.length > 0 ? (
            data?.map((item) => (
              <div key={item.id} className={styles.qCard}>

                <Link className={styles.quizLink} key={item.id} href={`/quizy/${item.id}`} >
                  <h4>{item.title}</h4>
                </Link>

              </div>
            ))) : (
            <h3>No results found</h3>
          )}



      </div>



    </div>
  );

};

export default Quizy;




