import styles from "./qlake.module.css";
import Image from "next/image";
import Answers from "../../../components/answers/Answers";

const getData = async (id) => {
  
  const res = await fetch(process.env.NEXTAUTH_URL + `/api/qlake/${id}`, {
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error("Failed");
  }

  return res.json();
};

const QLakeQuestion = async ({ params }) => {
 
  const id = params.id;
  
  const data = await getData(params.id);

  return (
    <div className={styles.container}>
      <h1>{data?.question}</h1>
      <span>{data?.createdAt}</span>
      <span>{data?.views}</span>
      <div className={styles.comment}>
            <Answers questionId={id} />
          </div>
    </div>
  );
};

export async function generateMetadata({ params }) {
  const { id } = params;

  const data = await getData(id);

  return {
    openGraph: {
      title: data?.title,
      images: [{ url: data.img }],
      siteName: 'Next.js',
      type: 'website',
    }
  };
}


export default QLakeQuestion;