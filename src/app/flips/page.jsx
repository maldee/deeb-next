'use client'


import styles from "./flips.module.css";
import Pagination from "./../../components/pagination/Pagination";
import FlipsSkeleton from "./flips.skeleton";
import 'react-loading-skeleton/dist/skeleton.css'

import { TailSpin } from 'react-loader-spinner';
import Flip from "../../components/flip/Flip";

import React, { useState ,useEffect} from 'react';
import ResponsivePagination from 'react-responsive-pagination';
import 'react-responsive-pagination/themes/classic.css'
import useSWR from "swr";

// export const metadata = {
//   title: "Flips | Deeflow",
//   description: "Memorize anything with deeflow",
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

const Flips = ({ searchParams }) => {

  const page = parseInt(searchParams.page) || 1;

  const [selectedLesson, setLesson] = useState('Select Lesson')

  const [selectedType, setType] = useState('Select Type')

  const [postCount, setData] = useState();
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    // fetch data
    const dataFetch = async () => {
      const postCount = await (
        await fetch("/api/flips/list",
        )
      ).json();

      // set state when the data received
      setData(postCount);
    };

    dataFetch();
  }, []);

  
  const { data, mutate, isLoading } = useSWR(
    `/api/flips?page=${page}&lesson=${selectedLesson}&type=${selectedType}`,
    fetcher
  );

  const posts  = data?.posts;
  
  const count = postCount?.length;
  
  const POST_PER_PAGE = 5;

  const totalPages = Math.ceil(count / POST_PER_PAGE);

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
          : data?.types?.map((item) => (
            <option key={item.id} value={item.type}>{item.type}</option>
          ))}
      </select>

      {data?.flips.length > 0 ? (
        <ResponsivePagination
        maxWidth={`50px`}
        current={currentPage}
        total={totalPages}
        onPageChange={setCurrentPage}
      />
      ) : (null)}


      <div className={styles.flipList}>
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

export default Flips;
