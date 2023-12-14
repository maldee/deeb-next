'use client'

import styles from "./contact.module.css";
import Image from "next/image";


export default function Contact() {
  async function onSubmit(event) {
    event.preventDefault()

    const formData = new FormData(event.target)
    const response = await fetch('/api/contact/submit', {
      method: 'POST',
      body: formData,
    })

    // Handle response if necessary
    const data = await response.json()
    // ...
  }

  return (
    <div className={styles.container}>
      <h1>Contact Us</h1>
      <div className={styles.contactForm}>
        <form onSubmit={onSubmit}>
          <input placeholder="Name" className={styles.contactInput} type="text" name="name" />
          <input placeholder="Anything you want to say"  className={styles.contactInput} type="textarea" name="reason" />
          <input placeholder="Email"  className={styles.contactInput} type="email" name="email" />
          <input placeholder="Phone"  className={styles.contactInput} type="phone" name="phone" />
          <button className={styles.sendBtn} type="submit">
            Submit
        </button>
        </form>
      </div>

    </div>

  )
}
