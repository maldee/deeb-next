'use client'

import styles from "./quizyPage.module.css";

import Link from "next/link";
import { TailSpin } from 'react-loader-spinner';
import 'react-loading-skeleton/dist/skeleton.css'
import QuizySkeleton from "./quizy.skeleton";
import { FaSearch } from "react-icons/fa";
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

const Quizy = ({ searchParams }) => {

  const page = parseInt(searchParams.page) || 1;
  const [selectedSubject, setSubject] = useState('Select Subject')

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
  }, [query,selectedSubject]);

  const { data, mutate, isLoading } = useSWR(
    `/api/quizy?page=${page}&query=${query}&subject=${selectedSubject}`,
    fetcher
  );

  const count = postCount?.count;
  
  const POST_PER_PAGE = 5;

  const totalPages = Math.ceil(count / POST_PER_PAGE);

  return (

    <div className={styles.container}>
      <input className={styles.searchInput} type="text" placeholder="Search quiz..." onChange={(e) => setQuery(e.target.value)} />

      <button className={styles.searchIcon}>
          <FaSearch />
        </button>

      <select className={styles.selectInput} name="subjects" id="subjects" onChange={e => setSubject(e.target.value)} value={selectedSubject}>
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




