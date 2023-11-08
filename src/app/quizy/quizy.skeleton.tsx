import React from "react";
import styles from "./quizyPage.module.css";
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';

const ClassroomSkeleton = () => {
    return (
        <SkeletonTheme baseColor="#1f273a" highlightColor="#0F1729">
        <ul className="list">
        {Array(5)
            .fill(1, 2)
            .map((item, index) => (
                
        <div className={styles.skeletonBody}>
             <Skeleton className={styles.skeletonItem} />
            </div>
     
        ))}
          </ul>
          </SkeletonTheme>
    );
};
export default ClassroomSkeleton;
