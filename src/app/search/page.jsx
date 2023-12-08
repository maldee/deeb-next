'use client';

import React from "react";
import { useState, useEffect } from "react"
import Posts from './Posts'
import styles from "./searchPage.module.css";
import useSWR from "swr";

import 'react-loading-skeleton/dist/skeleton.css'
import SkeletonSearch from "./skeletonSearch";
import { ErrorBoundary } from 'react-error-boundary'

// export const metadata = {
//   title: "Search | Deeflow",
//   description: "Search in deeflow",
// };

function refreshPage() {
  
  window.location.reload(false);
}

function ErrorFallback({ error, resetErrorBoundary }) {

  return (
    <div role="alert" className={styles.errorContent}>
      <h2 className={styles.errorTopic}>Something went wrong</h2>
      <h3 className={styles.errorMessage}>Please check your network connection</h3>
      <button className={styles.errorButton} onClick={refreshPage}>Try again</button>
    </div>
  )
}

function Search({ retryCount }) {
  const [query, setQuery] = useState('')

  const fetcher = async (url) => {
    const res = await fetch(url);

    const data = await res.json();

    if (!res.ok) {
      // const error = new Error(data.message);
      // throw error;
    }


    return data;
  };

  const { data, mutate, isLoading } = useSWR(
    `/api/posts/search?query=${query}`,
    fetcher
  );

  return (
    <div className={styles.search}>

      <input className={styles.searchInput} type="text" placeholder="Search post..." value={query} onChange={(e) => setQuery(e.target.value)} />

      
        {isLoading
          ? <SkeletonSearch count={5} />
          : data?.map((item) => (
            <Posts item={item} key={item._id} />
          ))}


    </div>
  )
}

export default function App() {

  const [retryCount, setRetryCount] = React.useState(0)

  return (
    <ErrorBoundary
      FallbackComponent={ErrorFallback}
      onReset={() => setRetryCount(retryCount + 1)} // increment the retry count on reset
      resetKeys={[retryCount]} // reset the error boundary when `retryCount` changes
    >
      <Search someKey={retryCount} />
    </ErrorBoundary>
  )
}