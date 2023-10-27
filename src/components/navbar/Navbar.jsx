import React from "react";
import styles from "./navbar.module.css";
import Image from "next/image";
import Link from "next/link";
import AuthLinks from "../authLinks/AuthLinks";
import ThemeToggle from "../themeToggle/ThemeToggle";
import { FaSearch } from "react-icons/fa";

const Navbar = () => {
  return (
    <div className={styles.container}>
      <div className={styles.logo}>
        <a href="/" className={styles.logoLink}>
          <Image src="/logo.png" alt="deeflow" width={40} height={40} />
        </a>
        <div className={styles.searchIcon}>
          <FaSearch />
        </div>
      </div>





      <div className={styles.links}>
        <ThemeToggle />
        <AuthLinks />
      </div>
    </div>
  );
};

export default Navbar;
