import styles from "./terms.module.css";
import Image from "next/image";

export const metadata = {
  title: "Terms of Service | Deeflow",
  description: "Terms of service deeflow",
};

export default function Qlake({ searchParams }) {
  const page = parseInt(searchParams.page) || 1;

  return (
    <div className={styles.container}>
       <blockquote class="blockquote">
        <h3>DEEFLOW TERMS, CONDITIONS, AND PRIVACY POLICY</h3>
        <footer class="blockquote-footer">Last updated : December 17, 2023</footer>
      </blockquote>

      <hr />
      <br />
      <p class="pcolor"><b>What is this Policy for?</b></p>
      <p>This document explains the terms & conditions and privacy policy on the use of deeflow.com website. We have tried to make it as short and readable as possible, but please read it carefully because you are bound by its content when using this website.</p>

      <br />

      <p class="pcolor"><b>Disclaimer</b></p>
      <p>The website contains a lot of information. Some of the content is created by the owners and some sourced from elsewhere. Although we carefully draft the information we publish and we try to correct any mistakes as soon as possible, you should be aware that you use any of the information on this website at your own risk.</p>

      <br />

      <p class="pcolor"><b>Use of Cookies</b></p>
      <p>This website uses cookies to better the user's experience while visiting the website.</p>
      <p>This website uses tracking software to monitor its visitors to better understand how they use it. This software is provided by Google Analytics which uses cookies to track visitor usage. You can read the privacy policies of this software on the respective websites.</p>
      <p>http://www.google.com/privacy.html</p>
      <p>Users are advised that if they wish to deny the use and saving of cookies from this website onto their computer's hard drive they should take necessary steps within their web browser's security settings to block all cookies from this website and its external serving vendors.</p>

      <br />

      <p class="pcolor"><b>External Links</b></p>
      <p>The owners of this website cannot guarantee or verify the contents or the security of any externally linked website. Users are advised to adopt a policy of caution before clicking any external web links mentioned throughout this website.</p>
      <p>This website also uses its own youtube channel 'Dee Classroom' to play video lessons.</p>
      <p>Users should therefore note they click on external links at their own risk and this website and its owners cannot be held liable for any damages or implications caused by visiting any external links mentioned.</p>

      <br />

      <p class="pcolor"><b>Adverts and Sponsored Links</b></p>
      <p>This website may contain sponsored links and adverts. These will typically be served through our advertising partners, to whom may have detailed privacy policies relating directly to the adverts they serve.
        Clicking on any such adverts will send you to the advertiser’s website directly or through a referral program that may use cookies and will track the number of referrals sent from this website. Users should therefore note they click on sponsored external links at their own risk and this website and its owners cannot be held liable for any damages or implications caused by visiting any external links mentioned.</p>

      <br />

      <p class="pcolor"><b>Social Media Platforms</b></p>
      <p>Communication, engagement, and actions taken through external social media platforms that this website and its owners participate in are custom to the terms and conditions as well as the privacy policies held with each social media platform respectively.
        Users are advised to use social media platforms wisely and communicate/engage with them with due care and caution regarding their privacy and personal details. This website nor its owners will ever ask for personal or sensitive information through social media platforms and encourage users wishing to discuss sensitive details to contact them through primary communication channels such as by telephone or email.
        This website may use social sharing buttons that help share web content directly from web pages to the social media platform in question. Users are advised before using such social sharing buttons that they do so at their discretion and note that the social media platform may track and save your request to share a web page respectively through your social media platform account.</p>

      <br />
    </div>
  );
}
