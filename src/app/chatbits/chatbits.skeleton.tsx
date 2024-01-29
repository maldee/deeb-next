import React from "react";
import styles from "./chatbits.module.css";
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';

const ChatbitsSkeleton = () => {
    return (
        <SkeletonTheme baseColor="#1f273a" highlightColor="#0F1729">
        <ul className="list">
        {Array(7)
            .fill(1, 2)
            .map((item, index) => (
                
        <div key={item.id} className={styles.skeletonBody}>
             <Skeleton className={styles.skeletonItem} height={130} />
            </div>
     
        ))}
          </ul>
          </SkeletonTheme>
    );
};
export default ChatbitsSkeleton;
