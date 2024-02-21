import Image from "next/image";
import styles from "./checkbox.module.css";
import React, { useState } from "react";

const Checkbox = ({ id, label, value, onChange }) => {
  return (
    <div className={styles.checkboxWrapper} >
      <input 
        id={id} 
        type="checkbox" 
        checked={value} 
        onChange={onChange} 
      />
      <label htmlFor={id} className={styles.checkLabel}>{label}</label>
    </div>
  );
};

export default Checkbox;