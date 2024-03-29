'use client'

import styles from "./quizyPage.module.css";
import React from 'react';
import Quiz from 'react-quiz-component';
import useSWR from "swr";
import { useParams } from 'next/navigation'
import Link from "next/link";
import { TailSpin } from 'react-loader-spinner';
import Methody from "../../../components/methody/Methody";

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

    <div >
       {isLoading
          ?
          <TailSpin
            height="40"
            width="40"
            color="#8a2be2"
            ariaLabel="tail-spin-loading"
            radius="1"
            wrapperStyle={{}}
            wrapperClass={styles.tailLoader}
            visible={true}
          />
          :
      <div className={styles.gridList}>
      <div className={styles.quizyList}>

        <Link href="/quizy" className={styles.slideMenuButtonActivated}>
          {'< Back to Quizes'}
        </Link>

       
          <div className={styles.quizSection}>
            <h5 className={styles.quizDetails} >{data?.title} | {data?.note}</h5>
            <Quiz className={styles.quizContainer} quiz={data?.quiz} showInstantFeedback={true}/>

          </div>
        
      </div>
      <div className={styles.grammarTree}>
        <Methody/>
      </div>
      </div>
      }
    </div>
  );
};

export default QuizyStart;
