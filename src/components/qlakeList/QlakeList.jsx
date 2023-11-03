import React from "react";
import styles from "./qlakeList.module.css";
import Pagination from "../pagination/Pagination";


const getData = async (page) => {
  const res = await fetch(
    process.env.NEXTAUTH_URL + `/api/qlake?page=${page}`,
    {
      cache: "no-store",
    }
  );

  if (!res.ok) {
    throw new Error("Failed");
  }

  return res.json();
};

const QlakeList = async ({ page }) => {
  const { questions, count } = await getData(page);
  console.log(questions)
  const POST_PER_PAGE = 5;

  const totalPages = Math.ceil(count / POST_PER_PAGE);

  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

  const hasPrev = POST_PER_PAGE * (page - 1) > 0;
  const hasNext = POST_PER_PAGE * (page - 1) + POST_PER_PAGE < count;

  return (
    <div className={styles.container}>
      <div className={styles.paginationBar}>
        <h3 className={styles.title}>Questions</h3>
        <Pagination page={page} pages={pages} hasPrev={hasPrev} hasNext={hasNext} />
      </div>
      <div className={styles.questions}>
    
        {questions?.map((item) => (
          <a href={`/qlake/${item.id}`} className={styles.linkMuted}>
            {item.question}
        </a>
          
        ))}
      </div>

    </div>
  );
};

export default QlakeList;
