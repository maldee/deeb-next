'use client'

import styles from "./quizyPage.module.css";
import React from 'react';
import useSWR from "swr";
import { useState } from "react"
import Link from "next/link";
import { ColorRing } from 'react-loader-spinner';
import 'react-loading-skeleton/dist/skeleton.css'
import QuizySkeleton from "./quizy.skeleton";

export default function Quizy() {

  const [query, setQuery] = useState('')

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

  const { data, mutate, isLoading } = useSWR(
    `/api/quizy?query=${query}`,
    fetcher
  );

  return (

    <div className={styles.container}>
      <input className={styles.searchInput} type="text" placeholder="Search quiz..." onChange={(e) => setQuery(e.target.value)} />

      <div className={styles.quizyList}>
        
          {isLoading ? 
           <QuizySkeleton count={5} />
          :
            data?.map((item) => (
              <div className={styles.qCard}>
              
                <Link className={styles.quizLink} key={item.id} href={`/quizy/${item.id}`} >
                  <h4>{item.title}</h4>
                </Link>
             
              </div>
            ))}


         
        </div>

     

    </div>
  );

}




