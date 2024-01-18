import styles from "./viewPostPage.module.css";
import Image from "next/image";
import Comments from "../../../components/comments/Comments";
import SocialShare from "../../../components/socialShare/SocialShare";

const getData = async (slug) => {
  const res = await fetch(process.env.NEXTAUTH_URL + `/api/posts/${slug}`, {
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error("Failed");
  }

  return res.json();
};

const SinglePage = async ({ params }) => {

  const { slug } = params;

  const data = await getData(slug);

  return (
    <div className={styles.container}>
      <div className={styles.textContainer}>
        <h1 className={styles.title}>{data?.title}</h1>
      </div>
      <div className={styles.userContainer}>
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
      </div>
      {data?.img && (
        <div className={styles.imageThumbnail}>
          <Image src={data.img} alt="" fill className={styles.image} />
        </div>
      )}
      <div className={styles.content}>
        <div className={styles.post}>
          <div
            className={styles.description}
            dangerouslySetInnerHTML={{ __html: data?.desc }}
          />
        </div>
      </div>

      <SocialShare slug={data.slug} catSlug={data.catSlug}  />

      <div className={styles.comment}>
        <Comments postSlug={slug} />
      </div>
    </div>
  );
};

export async function generateMetadata({ params }) {
  const { slug } = params;

  const data = await getData(slug);

  return {
    openGraph: {
      title: data?.title,
      images: [{ url: data.img }],
      siteName: 'deeflow.com',
      type: 'website',
    }
  };
}


export default SinglePage;