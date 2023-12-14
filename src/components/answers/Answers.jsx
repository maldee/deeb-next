"use client";

import Link from "next/link";
import styles from "./answers.module.css";
import Image from "next/image";
import useSWR from "swr";
import { useSession } from "next-auth/react";
import { useState } from "react";
import { TailSpin } from 'react-loader-spinner';

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

const Answers = ({ qid }) => {
  
  const { status } = useSession();

  const { data, mutate, isLoading } = useSWR(
    `/api/answers?qid=${qid}`,
    fetcher
  );

  const [answer, setAnswer] = useState("");

  let questionId = parseInt(qid);

  const handleSubmit = async () => {
    await fetch("/api/answers", {
      method: "POST",
      body: JSON.stringify({ answer, questionId }),
    });
    mutate();
  };

  return (
    <div className={styles.container}>
      <h2 className={styles.title}><span>{data?.length}</span> Answers</h2>
      {status === "authenticated" ? (
        <div className={styles.write}>
          <textarea
            placeholder="write a answer..."
            className={styles.input}
            onChange={(e) => setAnswer(e.target.value)}
          />
          <button className={styles.button} onClick={handleSubmit}>
            Send
          </button>
        </div>
      ) : (
        <Link href="/login">Login to write a answer</Link>
      )}
      <div className={styles.comments}>
        {isLoading
          ? <TailSpin
          height="40"
          width="40"
          color="#8a2be2"
          ariaLabel="tail-spin-loading"
          radius="1"
          wrapperStyle={{}}
          wrapperClass=""
          visible={true}
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

      
      
    </div>
  );
};

export default Answers;
