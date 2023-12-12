"use client";

import styles from "./cardList.module.css";
import Pagination from "../pagination/Pagination";
import Card from "../card/Card";


import React, { useState ,useEffect} from 'react';
import ResponsivePagination from 'react-responsive-pagination';
import 'react-responsive-pagination/themes/classic.css'
import useSWR from "swr";
import 'react-loading-skeleton/dist/skeleton.css'
import SkeletonCardList from "./skeletonCardList";

const fetcher = async (url) => {
  const res = await fetch(url);

  const data = await res.json();

  if (!res.ok) {
    const error = new Error(data.message);
    throw error;
  }
  return data;
};

const CardList = ({ page, cat }) => {

  const [postCount, setData] = useState();
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    // fetch data
    const dataFetch = async () => {
      const postCount = await (
        await fetch("/api/posts/list",
        )
      ).json();

      // set state when the data received
      setData(postCount);
    };

    dataFetch();
  }, []);

  const { data, mutate, isLoading } = useSWR(
    `/api/posts?page=${currentPage}&cat=${cat || ""}`,
    fetcher
  );

 
  const posts  = data?.posts;
  
  const count = postCount?.length;
  
  const POST_PER_PAGE = 5;

  const totalPages = Math.ceil(count / POST_PER_PAGE);

  return (
    <div className={styles.container}>
      <div className={styles.paginationBar}>
        <ResponsivePagination
          maxWidth={`50px`}
          current={currentPage}
          total={totalPages}
          onPageChange={setCurrentPage}
        />
      </div>
      <div className={styles.posts}>
        {isLoading ? 
        
        <SkeletonCardList count={5} />
        : posts?.map((item) => (
          <Card item={item} key={item.id} />
        ))}
      </div>

    </div>
  );
};

export default CardList;
