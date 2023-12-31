import styles from "./qlakeView.module.css";
import Image from "next/image";
import Answers from "../../../components/answers/Answers";
import Chip from "../../../components/chip/Chip";


const getData = async (qid) => {
  const res = await fetch(process.env.NEXTAUTH_URL + `/api/qlake/${qid}`, {
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error("Failed");
  }

  return res.json();
};


const QLakeQuestion = async ({ params }) => {

  const id  = params.id;

  const data = await getData(id);

  return (
    <div className={styles.container}>
      <div className={styles.answerCard}>
        <h1 className={styles.qTitle}>{data?.question}</h1>
        <p className={styles.qTitle}>{data?.desc}</p>
        <br/>
        <div className={styles.user}>
         
            {data?.user?.image && (
              <div className={styles.userImageContainer}>
                <Image src={data.user.image} alt="" fill className={styles.avatar} />
              </div>
            )}
          <div className={styles.userTextContainer}>
            <span className={styles.username}>{data?.user.name}</span>
            <span className={styles.date}> {data?.createdAt.substring(0, 10)} {" "}</span>
          </div>
        </div>

        <div className={styles.qDetails}>
        <Chip item={data?.tags} key={data?.id} />
          <h4 className={styles.qContent}>views:
            <span className={styles.qViews}> {data?.views}</span>  </h4>
         
        </div>

        <div className={styles.comment}>
          <Answers qid={id} />
        </div>
      </div>

    </div>
  );
};

export async function generateMetadata({ params }) {
  const { id } = params;

  const data = await getData(id);

  return {
    metadataBase: new URL('https://deeflow.com'),
    openGraph: {
      title: data?.question,
      siteName: 'Next.js',
      type: 'website',
    }
  };
}

export default QLakeQuestion;