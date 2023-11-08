import React from "react";
import styles from "./searchPage.module.css";
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';

const SkeletonPost = () => {
    return (
        <SkeletonTheme baseColor="#1f273a" highlightColor="#0F1729">
        
        <div className={styles.skeletonContainer}>
            <div  >
                <a >
                    <Skeleton height={80} width={100} />
                </a>
            </div>
            <div >
                <div >
                    <Skeleton height={20} width={250} />
                    <Skeleton height={20} width={150} />
                    <Skeleton height={20} width={100} />
                    
                </div>
                <div />
                <Skeleton height={15} width={80} />
            </div>
        </div>
          </SkeletonTheme>
    );
};
export default SkeletonPost;
