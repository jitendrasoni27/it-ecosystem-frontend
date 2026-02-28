import React from 'react';
import { Helmet } from 'react-helmet-async';

const SEO = ({ title, description, keywords }) => {
    return (
        <Helmet>
            <title>{title} | Soniapps Solutions</title>
            <meta name="description" content={description} />
            <meta name="keywords" content={keywords} />
            <meta property="og:title" content={`${title} | Soniapps Solutions`} />
            <meta property="og:description" content={description} />
            <meta property="og:type" content="website" />
        </Helmet>
    );
};

SEO.defaultProps = {
    title: 'Soniapps Solutions',
    description: 'Innovating Your Digital Future. We provide top-notch IT services including Web Development, App Development, and Tally Solutions.',
    keywords: 'IT Services, Web Development, Mobile Apps, Tally, Software Solutions, Tech Agency',
};

export default SEO;
