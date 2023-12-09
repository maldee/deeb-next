'use client'

import React, { useState } from "react";
import styles from "./flips.module.css";
import Pagination from "./../../components/pagination/Pagination";
import FlipsSkeleton from "./flips.skeleton";
import 'react-loading-skeleton/dist/skeleton.css'
import useSWR from "swr";
import { TailSpin } from 'react-loader-spinner';
import Flip from "../../components/flip/Flip";

// export const metadata = {
//   title: "Flips | Deeflow",
//   description: "Memorize anything with deeflow",
// };

export default function Flips({ searchParams }) {

  const page = parseInt(searchParams.page) || 1;

  const [selectedLesson, setLesson] = useState('Select Lesson')

  const [selectedType, setType] = useState('Select Type')

  const fetcher = async (url) => {


    const res = await fetch(url);

    const data = await res.json();

    if (!res.ok) {
      const error = new Error(data.message);
      throw error;
    }

    return data;
  };

  const { data, mutate, isLoading } = useSWR(
    `/api/flips?page=${page}&lesson=${selectedLesson}&type=${selectedType}`,
    fetcher
  );


  const count = data?.count;

  const POST_PER_PAGE = 6;

  const totalPages = Math.ceil(count / POST_PER_PAGE);

  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

  const hasPrev = POST_PER_PAGE * (page - 1) > 0;
  const hasNext = POST_PER_PAGE * (page - 1) + POST_PER_PAGE < count;




  return (
    <div className={styles.container}>

      <select className={styles.selectInput} name="lessons" id="lessons" onChange={e => setLesson(e.target.value)} value={selectedLesson}>
        <option value='Select Lesson'>Select Lesson</option>
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
          : data?.lessons?.map((item) => (
            <option key={item.id} value={item.lesson}>{item.lesson}</option>
          ))}

      </select>

      <select className={styles.selectInput} name="types" id="types" onChange={e => setType(e.target.value)} value={selectedType}>
        <option value='Select Type'>Select Type</option>
        {isLoading ?
          <ColorRing
            visible={true}
            height="40"
            width="40"
            ariaLabel="blocks-loading"
            wrapperStyle={{}}
            wrapperClass="blocks-wrapper"
            colors={['#e15b64', '#f47e60', '#f8b26a', '#abbd81', '#849b87']}
          />
          : data?.types?.map((item) => (
            <option key={item.id} value={item.type}>{item.type}</option>
          ))}
      </select>

      {data?.flips.length > 0 ? (
        <Pagination page={page} pages={pages} hasPrev={hasPrev} hasNext={hasNext} />
      ) : (null)}


      <div className={styles.flipList}>
        {isLoading ?
          <ColorRing
            visible={true}
            height="40"
            width="40"
            ariaLabel="blocks-loading"
            wrapperStyle={{}}
            wrapperClass="blocks-wrapper"
            colors={['#e15b64', '#f47e60', '#f8b26a', '#abbd81', '#849b87']}
          />
          : data?.flips.length > 0 ? (

            data?.flips?.map((item) => (

              <Flip item={item} key={item._id} />
            ))

          ) : (
            <h3>No results found</h3>
          )}




      </div>


    </div>
  );
}
