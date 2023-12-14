import React from "react";
import styles from "./cloudy.module.css";
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';

const ClassroomSkeleton = () => {
    return (
        <SkeletonTheme baseColor="#1f273a" highlightColor="#0F1729">
        <ul className="list">
        {Array(7)
            .fill(1, 2)
            .map((item, index) => (
                
        <div key={item.id} className={styles.skeletonBody}>
             <Skeleton height={40} width={`50%`} className={styles.skeletonItem} />
             <Skeleton height={40} width={`70%`} className={styles.skeletonItem} />
             <Skeleton height={40} width={`40%`} className={styles.skeletonItem} />
             <Skeleton height={40} width={`60%`} className={styles.skeletonItem} />
               
            </div>
     
        ))}
          </ul>
          </SkeletonTheme>
    );
};
export default ClassroomSkeleton;
