import Image from "next/image";
import styles from "./searchPage.module.css";
import Link from "next/link";


const Posts = ({ key, item }) => {
  return (
        <div className={styles.container} key={key}>
          
          {item.img && (
            <div className={styles.imageContainer} >
              <a  href={`/posts/${item.slug}`} className={styles.linkMuted}>
                <Image src={item.img} alt="" fill className={styles.image} />
              </a>
            </div>
          )}
          <div className={styles.textContainer}>

            <Link key={key} href={`/posts/${item.slug}`}>
              <span>{item.title}</span>
            </Link>
            <div className={styles.detail}>
              <span className={styles.date}>
                {item.createdAt.substring(0, 10)} -{" "}
              </span>
              <span className={styles.category}>{item.catSlug}</span>
            </div>
            <div className={styles.desc} dangerouslySetInnerHTML={{ __html: item?.desc.substring(0, 60) }} />
            
            
            <span className={styles.views}>{item.views} views</span>
              
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

            <Link key={key} href={`/posts/${item.slug}`}>
              <span className={styles.titleMobile}>{item.title}</span>
            </Link>

            <div className={styles.detailMobile}>
              <span className={styles.dateMobile}>
                {item.createdAt.substring(0, 10)} -{" "}
              </span>
              <span className={styles.categoryMobile}>{item.catSlug}</span>
            </div>
           
            <span className={styles.views}>{item.views} views</span>
            </div>
          </div>

        </div>
         );
};

export default Posts;










      
