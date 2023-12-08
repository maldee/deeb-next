import React from "react";
import styles from "./searchPage.module.css";
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';

const SkeletonSearch = () => {
    return (
        <SkeletonTheme baseColor="#1f273a" highlightColor="#0F1729">
        <ul className="list">
        {Array(7)
            .fill(1, 2)
            .map((item, index) => (
        <div className={styles.container}>
            <div  >
                <a >
                    <Skeleton key={item.id} height={80} width={100} />
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
        ))}
          </ul>
          </SkeletonTheme>
    );
};
export default SkeletonSearch;
