import Image from "next/image";
import styles from "./flip.module.css";
import ReactCardFlip from "react-card-flip";
import React, { useState } from "react";

const Flip = ({ key, item }) => {

  const [flip, setFlip] = useState(false);

  return (
    <div className={styles.container} key={key}>

      <ReactCardFlip key={item.id} isFlipped={flip}
        flipDirection="horizontal">

        {item.front.includes('http') ? (
          <div className={styles.imageFront} >
            <Image src={item.front} alt="" fill className={styles.front} onClick={() => setFlip(!flip)} />
          </div>
        ) : (
          <div className={styles.textFront} onClick={() => setFlip(!flip)}>
            <h3  >{item.front} </h3>
          </div>
        )}

        {item.back.includes('http') ? (
          <div className={styles.imageBack} >
            <Image src={item.back} alt="" fill className={styles.front} onClick={() => setFlip(!flip)} />
          </div>
        ) : (
          <div className={styles.back} onClick={() => setFlip(!flip)}>
            {item.back}
            <br />

          </div>
        )}
      </ReactCardFlip>

    </div>
  );
};

export default Flip;
