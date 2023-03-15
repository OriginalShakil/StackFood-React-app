import React from 'react'
import Head from 'next/head'
import { useTranslation } from 'react-i18next'
import { capitalize } from '../utils/capitalize'
import { useSelector } from 'react-redux'
const metaHost = require('../utils/metaHost.json')

const Meta = ({ title, description, keywords, ogImage, ogType, pathName }) => {
    const { t } = useTranslation()
    // const { global } = useSelector((state) => state.globalSettings)
    // const origin =
    //     typeof window !== 'undefined' && window.location.origin
    //         ? window.location.origin
    //         : ''
    // const business_name = global?.business_name
    return (
        <Head>
            <title>{title}</title>
            {/*<meta name="description" content={description} />*/}

            {/*<!-- Google / Search Engine Tags -->*/}
            <meta itemProp="name" content={title} />
            <meta itemProp="description" content={description} />
            <meta itemProp="image" content={ogImage} />
            <meta property="og:type" content="website" />

            {/*<!-- Facebook Meta Tags -->*/}
            <meta property="og:title" content={title} />
            <meta property="og:description" content={description} />
            <meta property="og:image" content={ogImage} />
            <meta property="og:image:type" content="image/jpg" />
            <meta property="og:image:width" content="1080" />
            <meta property="og:image:height" content="608" />
            <meta property="og:url" content={pathName} />
            <meta property="og:type" content="website" />

            {/*<!-- Twitter Meta Tags -->*/}
            <meta name="twitter:title" content={title} />
            <meta name="twitter:description" content={description} />
            <meta name="twitter:image" content={ogImage} />
            <meta name="twitter:card" content="summary_large_image" />
        </Head>
    )
}

export default Meta
