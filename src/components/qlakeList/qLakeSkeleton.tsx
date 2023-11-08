import React from "react";
import styles from "./qLakeSkeleton.module.css";
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';

const QlakeSkeleton = () => {
    return (
        <SkeletonTheme baseColor="#1f273a" highlightColor="#0F1729">
            <ul className="list">
                {Array(6)
                    .fill(1, 2)
                    .map((item, index) => (
                        
                        <div className={styles.container}>
                            <Skeleton className={styles.skeletonBody}  />
                            
                            
                        </div>
                    ))}
            </ul>
        </SkeletonTheme>
    );
};
export default QlakeSkeleton;
