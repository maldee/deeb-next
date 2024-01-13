'use client';

import styles from "./homepage.module.css";
import Hero from "../components/home-hero/Hero";
import Analytics from "../components/home-analytics/Analytics";
import Features from "../components/home-features/Features";
import Testimonial from "../components/home-testimonial/Testimonial";
import Mentors from "../components/home-mentors/Mentors";
import Subscribe from "../components/home-subscribe/Subscribe";
import Flows from "../components/home-flows/Flows";
import { GoogleAnalytics } from '@next/third-parties/google'

export default function Home({ searchParams }) {

    const page = parseInt(searchParams.page) || 1;

    return (

        <div className={styles.container}>
            <GoogleAnalytics gaId="G-LFHZ053M0Z" />
            <Hero />
            <Analytics />
            <Flows />
            <Features />
            <Testimonial />
            <Mentors />
            <Subscribe />

        </div>
    );
}
