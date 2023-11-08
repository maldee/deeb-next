import Image from "next/image";
import styles from "./card.module.css";
import Link from "next/link";

const Card = ({ key, item }) => {
  return (
    <div className={styles.container} key={key}>
 
      {item.img && (
        <div className={styles.imageContainer}>
          <a href={`/pages/posts/${item.slug}`} className={styles.linkMuted}>
            <Image src={item.img} alt="" fill className={styles.image} />
          </a>

        </div>
      )}
      <div className={styles.textContainer}>
       
        <Link key={key} href={`/posts/${item.slug}`}>
          <h2>{item.title}</h2>
        </Link>
        <div className={styles.detail}>
          <span className={styles.date}>
            {item.createdAt.substring(0, 10)} -{" "}
          </span>
          <span className={styles.category}>{item.catSlug}</span>
        </div>
        {/* <p className={styles.desc}>{item.desc.substring(0, 60)}</p> */}
        <div className={styles.desc} dangerouslySetInnerHTML={{ __html: item?.desc.substring(0, 60) }} />
       
        <Link href={`/posts/${item.slug}`} className={styles.link}>
          Read More
        </Link>
      </div>


      <div className={styles.mobileCard}>

        {item.img && (

          <div className={styles.mobileImageContainer}>
            <a href={`/posts/${item.slug}`} className={styles.linkMuted}>
              <Image src={item.img} alt="" fill className={styles.image} />
            </a>
          </div>
        )}

        <div className={styles.mobileTextContainer}>

          <div className={styles.desc} dangerouslySetInnerHTML={{ __html: item?.desc.substring(0, 60) }} />
          <Link href={`/posts/${item.slug}`} className={styles.link}>
            Read More
          </Link>
        </div>
      </div>

    </div>
  );
};

export default Card;
