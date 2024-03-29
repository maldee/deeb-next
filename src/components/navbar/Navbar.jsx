import React from "react";
import styles from "./navbar.module.css";
import Image from "next/image";
import Link from "next/link";
import AuthLinks from "../authLinks/AuthLinks";
import ThemeToggle from "../themeToggle/ThemeToggle";
import NavMenu from "../navMenu/NavMenu";
import { FaSearch } from "react-icons/fa";

const Navbar = () => {
  return (
    <div className={styles.container}>
      <div className={styles.logo}>
        <a href="/" className={styles.logoLink}>
          <Image src="/logo.png" alt="deeflow" width={40} height={40} />
        </a>
        <div className={styles.searchIcon}>
          <Link href="/search" className={styles.link}>
            <FaSearch />
          </Link>
        </div>
      </div>





      <div className={styles.links}>
        <NavMenu/>
        <ThemeToggle />
        <AuthLinks />
      </div>
    </div>
  );
};

export default Navbar;
