'use client'

import styles from "./classroomPage.module.css";
import Image from "next/image";

import YouTube from 'react-youtube';
import { FaSearch } from "react-icons/fa";
import Link from "next/link";
import Pagination from "./../../components/pagination/Pagination";
import { TailSpin } from 'react-loader-spinner';
import ClassroomSkeleton from "./classroom.skeleton";
import 'react-loading-skeleton/dist/skeleton.css'

import React, { useState, useEffect } from 'react';
import ResponsivePagination from 'react-responsive-pagination';
import 'react-responsive-pagination/themes/classic.css'
import useSWR from "swr";

// export const metadata = {
//   title: "Classroom | Deeflow",
//   description: "Interactive learning with deeflow",
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

const Classroom = ({ searchParams }) => {

  const page = parseInt(searchParams.page) || 1;
  const [selectedSubject, setSubject] = useState('Select Subject')

  const [query, setQuery] = useState('')

  const [postCount, setData] = useState();
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    // fetch data
    const dataFetch = async () => {
      const postCount = await (
        await fetch(`/api/classroom/list?page=${currentPage}&query=${query}&subject=${selectedSubject}`,
        )
      ).json();

      // set state when the data received
      setData(postCount);
    };

    dataFetch();
  }, [query,selectedSubject]);


  const { data, mutate, isLoading } = useSWR(
    `/api/classroom?page=${currentPage}&query=${query}&subject=${selectedSubject}`,
    fetcher
  );

  const count = postCount?.count;

  const POST_PER_PAGE = 5;

  const totalPages = Math.ceil(count / POST_PER_PAGE);

  return (

    <div className={styles.container}>
     
        <input className={styles.searchInput} type="text" placeholder="Search video..." onChange={(e) => setQuery(e.target.value)} />
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


      <div className={styles.videoList}>
        {isLoading ?
          <ClassroomSkeleton count={5} />
          : data?.videos.length > 0 ? (
            data?.videos?.map((item) => (
              <YouTube key={item.id} className={styles.videoList} videoId={item.link.split('be/')[1]} />

            ))) : (
            <h3>🙄 No results found</h3>
          )}

      </div>

    </div>
  );

}

export default Classroom;


