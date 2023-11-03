'use client'
import styles from "./quizyPage.module.css";
import React from 'react';
import Quiz from 'react-quiz-component';
import useSWR from "swr";
import { useParams } from 'next/navigation'
import Link from "next/link";

const fetcher = async (url) => {
  console.log("fetcher")
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
  console.log("id isss " + id)

  const { data, mutate, isLoading } = useSWR(
    `/api/quizy/${id}`,
    fetcher
  );


  return (


    <div className={styles.videoList}>

      <Link href="/quizy">
        <button className={styles.slideMenuButtonActivated} >{'Back to Quizes'}</button>
      </Link>

      {isLoading
        ? "loading"
        : <Quiz quiz={data?.quiz} shuffleAnswer={true} />}
    </div>

  );
};

export default QuizyStart;
