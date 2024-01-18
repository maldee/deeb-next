'use client'

import styles from "./socialshare.module.css";
import {
    FacebookShareButton, FacebookIcon, LinkedinShareButton,
    LinkedinIcon, WhatsappShareButton,
    WhatsappIcon,
} from 'next-share'

const SocialShare = ({ slug, catSlug }) => {

    return (

        <div className={styles.chipContainer}>
            <FacebookShareButton
                url={'https://deeflow.com/posts/' + slug}
                hashtag={'#' + catSlug}
            >
                <FacebookIcon size={42} round />
            </FacebookShareButton>

            <LinkedinShareButton  url={'https://deeflow.com/posts/' + slug}>
                <LinkedinIcon size={42} round />
            </LinkedinShareButton>
            
            <WhatsappShareButton
                 url={'https://deeflow.com/posts/' + slug}
                separator=":: "
            >
                <WhatsappIcon size={42} round />
            </WhatsappShareButton>
        </div>
    );
};

export default SocialShare;
