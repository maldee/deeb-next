'use client'
import styles from "./quizyPage.module.css";
import React from 'react';
import Quiz from 'react-quiz-component';
import useSWR from "swr";
import { useParams } from 'next/navigation'
import Link from "next/link";
import { ColorRing } from 'react-loader-spinner';

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


  return (


    <div className={styles.quizyList}>

      <Link href="/quizy">
        <button className={styles.slideMenuButtonActivated} >{'Back to Quizes'}</button>
      </Link>

      {isLoading
        ? <ColorRing
        visible={true}
        height="40"
        width="40"
        ariaLabel="blocks-loading"
        wrapperStyle={{}}
        wrapperClass="blocks-wrapper"
        colors={['#e15b64', '#f47e60', '#f8b26a', '#abbd81', '#849b87']}
      />
        : <Quiz className={styles.quizContainer} quiz={data?.quiz} shuffleAnswer={true} />}
    </div>

  );
};

export default QuizyStart;
