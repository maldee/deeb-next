'use client'

import styles from "./qlakeList.module.css";
import Pagination from "../pagination/Pagination";
import Chip from "../../components/chip/Chip";

import QlakeSkeleton from "./qLakeSkeleton";
import 'react-loading-skeleton/dist/skeleton.css'
import { FaSearch } from "react-icons/fa";
import React, { useState, useEffect } from 'react';
import ResponsivePagination from 'react-responsive-pagination';
import 'react-responsive-pagination/themes/classic.css'
import useSWR from "swr";

const fetcher = async (url) => {
  const res = await fetch(url);

  const data = await res.json();

  if (!res.ok) {
    const error = new Error(data.message);
    throw error;
  }
  return data;
};

const QlakeList = ({ page }) => {

  const [query, setQuery] = useState('')
  const [postCount, setData] = useState();
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    // fetch data
    const dataFetch = async () => {
      const postCount = await (
        await fetch(`/api/qlake/list?page=${currentPage}&query=${query}`,
        )
      ).json();

      // set state when the data received
      setData(postCount);
    };

    dataFetch();
  }, [query]);

  const { data, mutate, isLoading } = useSWR(
    `/api/qlake?page=${currentPage}&query=${query}`,
    fetcher
  );

  const questions = data?.questions;

  const count = postCount?.count;

  const POST_PER_PAGE = 5;

  const totalPages = Math.ceil(count / POST_PER_PAGE);

  return (

    <div className={styles.container}>
      <input className={styles.searchInput} type="text" placeholder="Search question..." value={query} onChange={(e) => setQuery(e.target.value)} />
      <button className={styles.searchIcon}>
          <FaSearch />
        </button>

      <div className={styles.paginationBar}>
        <h3 className={styles.title}>Questions</h3>
        {postCount?.count > 0 ? (
          <ResponsivePagination
            maxWidth={`50px`}
            current={currentPage}
            total={totalPages}
            onPageChange={setCurrentPage}
          />
        ) : (null)}

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
            <h3>🙄 No results found</h3>
          )}
      </div>

    </div>
  );
};

export default QlakeList;

