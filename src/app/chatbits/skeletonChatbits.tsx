import React from "react";
import styles from "./chatbits.module.css";
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';

const SkeletonChatbits = () => {
    return (
        <SkeletonTheme baseColor="#1f273a" highlightColor="#0F1729">
        <ul className="list">
        {Array(7)
            .fill(1, 2)
            .map((item, index) => (
                
        <div className={styles.skeletonBody}>
             <Skeleton className={styles.skeletonItem} height={20} width={100} />
             <Skeleton className={styles.skeletonItem} height={20} width={150} />
             <Skeleton className={styles.skeletonItem} height={20} width={300} />
             
               
            </div>
     
        ))}
          </ul>
          </SkeletonTheme>
    );
};
export default SkeletonChatbits;