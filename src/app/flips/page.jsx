'use client'


import styles from "./flips.module.css";
import Pagination from "./../../components/pagination/Pagination";
import FlipsSkeleton from "./flips.skeleton";
import 'react-loading-skeleton/dist/skeleton.css'

import { TailSpin } from 'react-loader-spinner';
import Flip from "../../components/flip/Flip";

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

const Flips = ({ searchParams }) => {

  const { data: session } = useSession();
  const { status } = useSession();

  const router = useRouter();
  
  const page = parseInt(searchParams.page) || 1;

  const [selectedLesson, setLesson] = useState('EPS B1 Lesson 03')

  const [selectedType, setType] = useState('VOCABULARY')

  const [postCount, setData] = useState();
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    // fetch data
    const dataFetch = async () => {
      const postCount = await (
        await fetch(`/api/flips/list?page=${currentPage}&lesson=${selectedLesson}&type=${selectedType}`,
        )
      ).json();

      // set state when the data received
      setData(postCount);
    };

    dataFetch();
  }, [selectedLesson, selectedType]);


  const { data, mutate, isLoading } = useSWR(
    `/api/flips?page=${currentPage}&lesson=${selectedLesson}&type=${selectedType}`,
    fetcher
  );

  const posts = data?.posts;

  const count = postCount?.count;

  const POST_PER_PAGE = 6;

  const totalPages = Math.ceil(count / POST_PER_PAGE);

  function handleLesson(e) {
    setLesson(e.target.value)
    setCurrentPage(1)
    
  }

  function handleType(e) {
    setType(e.target.value)
    setCurrentPage(1)
  }

  if (status === "unauthenticated" || session?.user.subscription === "Free") {
    router.push("/plans");
  }

  return (
    <div className={styles.container}>
      <GoogleTagManager gtmId="G-LFHZ053M0Z" />
      <select className={styles.selectInputLesson} name="lessons" id="lessons" onChange={handleLesson} value={selectedLesson}>
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

      <select className={styles.selectInputType} name="types" id="types" onChange={handleType} value={selectedType}>
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

      {postCount?.count > 0 ? (
        <ResponsivePagination
          maxWidth={`50px`}
          current={currentPage}
          total={totalPages}
          onPageChange={setCurrentPage}
        />
      ) : (null)}


      <div className={styles.flipList}>
        {isLoading ?
          <FlipsSkeleton count={5} />
          : data?.count > 0 ? (

            data?.flips?.map((item) => (

              <Flip item={item} key={item._id} />
            ))

          ) : (
            <h3> 🙄 No results. Try different selection</h3>
          )}




      </div>


    </div>
  );
}

export default Flips;
