import React from "react";
import styles from "./cardList.module.css";
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';

const SkeletonCardList = () => {
    return (
        <SkeletonTheme baseColor="#1f273a" highlightColor="#0F1729">
        <ul className="list">
        {Array(5)
            .fill(1, 2)
            .map((item, index) => (
        <div key={item.id} className={styles.skeletonCardContainer}>
            <div className={styles.skeletonCardImage} >
                
                    <Skeleton height={250} width={360} />
                
            </div>
            <div className={styles.skeletonCardBody} >
                
                    <Skeleton className={styles.skeletonCardBodyDetails} height={50} width={350} />
                    <Skeleton className={styles.skeletonCardBodyDetails} height={20} width={180} />
                    <Skeleton className={styles.skeletonCardBodyDetails} height={30} width={300} />
                    <Skeleton className={styles.skeletonCardBodyDetails} height={20} width={120} />
                
            </div>
            
        </div>
        ))}
          </ul>
          </SkeletonTheme>
    );
};
export default SkeletonCardList;
