import React from "react";
import styles from "./cardList.module.css";
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';

const SkeletonCardList = () => {
    return (
        <SkeletonTheme baseColor="#1f273a" highlightColor="#0F1729">
        <ul className="list">
        {Array(3)
            .fill(1, 2)
            .map((item, index) => (
                <div key={item.id} className={styles.skeletonBody}>
                <Skeleton  className={styles.skeletonItem} />
                <Skeleton  className={styles.skeletonItem} />
                <Skeleton  className={styles.skeletonItem} />
                <Skeleton  className={styles.skeletonItem} />
                <Skeleton  className={styles.skeletonItem} />
                  
               </div>
        
           ))}
          </ul>
          </SkeletonTheme>
    );
};
export default SkeletonCardList;
