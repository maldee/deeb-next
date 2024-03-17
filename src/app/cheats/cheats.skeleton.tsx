import React from "react";
import styles from "./cheats.module.css";
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';

const CheatsSkeleton = () => {
    return (
        <SkeletonTheme baseColor="#1f273a" highlightColor="#0F1729">
        <ul className={styles.skeletonList}>
        {Array(7)
            .fill(1, 2)
            .map((item, index) => (
                
        <div key={item.id} className={styles.skeletonBody}>
             <Skeleton className={styles.skeletonItem} height={120} />
            </div>
     
        ))}
          </ul>
          </SkeletonTheme>
    );
};
export default CheatsSkeleton;
