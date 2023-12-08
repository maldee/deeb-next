"use client";

import Link from "next/link";
import styles from "./answers.module.css";
import Image from "next/image";
import useSWR from "swr";
import { useSession } from "next-auth/react";
import { useState } from "react";
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

const Answers = ({ id }) => {
  const { status } = useSession();

  const { data, mutate, isLoading } = useSWR(
    `/api/answers?questionId=${id}`,
    fetcher
  );

  const [desc, setDesc] = useState("");

  const handleSubmit = async () => {
    await fetch("/api/answers", {
      method: "POST",
      body: JSON.stringify({ desc, id }),
    });
    mutate();
  };

  return (
    <div className={styles.container}>
      <h2 className={styles.title}><span>{data?.length}</span> Answers</h2>

      <div className={styles.comments}>
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
          : data?.map((item) => (
              <div className={styles.comment} key={item.id}>
                <div className={styles.user}>
                  {item?.user?.image && (
                    <Image
                      src={item.user.image}
                      alt=""
                      width={50}
                      height={50}
                      className={styles.image}
                    />
                  )}
                  <div className={styles.userInfo}>
                    <span className={styles.username}>{item.user.name}</span>
                    <span className={styles.date}> {item.createdAt.substring(0, 10)} -{" "}</span>
                   
                  </div>
                </div>
                <p className={styles.desc}>{item.answer}</p>
              </div>
            ))}
      </div>

      {status === "authenticated" ? (
        <div className={styles.write}>
          <textarea
            placeholder="write a answer..."
            className={styles.input}
            onChange={(e) => setDesc(e.target.value)}
          />
          <button className={styles.button} onClick={handleSubmit}>
            Send
          </button>
        </div>
      ) : (
        <Link href="/login">Login to write a answer</Link>
      )}
      
    </div>
  );
};

export default Answers;
