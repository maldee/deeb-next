'use client'

import styles from "./quizyPage.module.css";
import React from 'react';
import Quiz from 'react-quiz-component';
import useSWR from "swr";
import { useParams } from 'next/navigation'
import Link from "next/link";
import { TailSpin } from 'react-loader-spinner';

const fetcher = async (url) => {
  
  const res = await fetch(url);

  const data = await res.json();

  if (!res.ok) {
    const error = new Error(data.message);
    throw error;
  }
  console.log(data)
  return data;
};

const QuizyStart = () => {
  const params = useParams()

  const id = params.id


  const { data, mutate, isLoading } = useSWR(
    `/api/quizy/${id}`,
    fetcher
  );

console.log("quizid "+data)
  return (


    <div className={styles.quizyList}>

      <Link href="/quizy">
        <button className={styles.slideMenuButtonActivated} >{'Back to Quizes'}</button>
      </Link>

      {isLoading
        ? 
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
        : <Quiz className={styles.quizContainer} quiz={data?.quiz} shuffleAnswer={true} />}
    </div>

  );
};

export default QuizyStart;
