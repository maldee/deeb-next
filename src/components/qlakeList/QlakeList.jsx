'use client'

import React from "react";
import styles from "./qlakeList.module.css";
import Pagination from "../pagination/Pagination";
import Chip from "../../components/chip/Chip";
import useSWR from "swr";
import QlakeSkeleton from "./qLakeSkeleton";
import 'react-loading-skeleton/dist/skeleton.css'

export default function QlakeList({ page }) {

  console.log("pageiss " + page)
  // const page = parseInt(searchParams.page) || 1;


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
    `/api/qlake?page=${page}`,
    fetcher
  );

  const questions = data?.questions;

  const count = data?.count;

  const POST_PER_PAGE = 5;

  const totalPages = Math.ceil(count / POST_PER_PAGE);

  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

  const hasPrev = POST_PER_PAGE * (page - 1) > 0;
  const hasNext = POST_PER_PAGE * (page - 1) + POST_PER_PAGE < count;

  return (

    <div className={styles.container}>
      <div className={styles.paginationBar}>
        <h3 className={styles.title}>Questions</h3>
        {questions?.length > 0 ? (
          <Pagination page={page} pages={pages} hasPrev={hasPrev} hasNext={hasNext} />
      ):(null)}

      </div>
      <div className={styles.questions}>
        {isLoading ? <QlakeSkeleton count={5} />
          : questions?.length > 0 ? (
            questions?.map((item) => (
              <div key={item.id} className={styles.card}>
                <a href={`/qlake/${item.id}`} className={styles.qLink}>
                  {item.question}
                </a>
                <p className={styles.qParagraph}>{item.desc}</p>
                <p className={styles.qParagraph}>
                  <Chip item={item.tags} key={item.id} />
                </p>
                <p className={styles.qViews}>{item.views} views</p>
              </div>
            ))) : (
            <h3>No results found</h3>
          )}
      </div>

    </div>
  );
};

