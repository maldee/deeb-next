'use client';

import React from "react";
import { useState } from "react"
import styles from "./chatbits.module.css";
import useSWR from "swr";
import 'react-loading-skeleton/dist/skeleton.css'
import ChatbitsSkeleton from "./chatbits.skeleton";

// export const metadata = {
//   title: "Chatbits | Deeflow",
//   description: "Word repository of deeflow",
// };

export default function Chatbits() {

  const [query, setQuery] = useState('')

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
    `/api/chatbits?query=${query}`,
    fetcher
  );

  return (
   <h1>hello</h1>
  )
}