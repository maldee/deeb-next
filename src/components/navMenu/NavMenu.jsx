"use client";

import Image from "next/image";
import styles from "./navmenu.module.css";
import { useContext } from "react";
import { useState } from "react";
import Link from "next/link";
import { useRouter } from 'next/navigation'

const NavMenu = () => {
  const router = useRouter()
  const [selectedFlow, setFlow] = useState()

  function handleMenu(e) {
    router.push('/'+e.target.value)
  }

  return (
    <select className={styles.selectMenu} name="menus" id="menus" onChange={handleMenu} value={selectedFlow}>
        <option value='/'></option>
        <option value='blog'><Link className={styles.authLink} href="/blog">📕 Blog</Link></option>
        <option value='classroom'><Link className={styles.authLink}  href="/classroom">👨‍🏫 Classroom</Link></option>
        <option value='dictionary'><Link className={styles.authLink}  href="/dictionary">📚 Dictionary</Link></option>
        <option value='chatbits'><Link className={styles.authLink}  href="/chatbits">🐦 Chatbits</Link></option>
        <option value='grammars'><Link className={styles.authLink}  href="/grammars">🧩 Grammars</Link></option>
        <option value='cheats'><Link className={styles.authLink}  href="/cheats">🎯 Cheats</Link></option>
        <option value='quizy'><Link className={styles.authLink}  href="/quizy">🏆 Quizy</Link></option>
        <option value='flips'><Link className={styles.authLink}  href="/flips">➰ Flips</Link></option>
        <option value='qlake'><Link className={styles.authLink}  href="/qlake">🪐 Qlake</Link></option>
        <option value='confusy'><Link className={styles.authLink}  href="/confusy">🤷‍♀️ Confusy</Link></option>
        <option value='cloudy'><Link className={styles.authLink}  href="/cloudy">☁️ Cloudy</Link></option>
        <option value='notes'><Link className={styles.authLink}  href="/notes">📜 Notes</Link></option>
        <option value='news'><Link className={styles.authLink}  href="/news">📰 News</Link></option>
        <option value='faq'><Link className={styles.authLink}  href="/faq">🗨️ FAQ</Link></option>
       

      </select>
  );
};

export default NavMenu;
