import { Helmet } from 'react-helmet-async';

const SEO = ({ 
  title = "CryLessMemes - Turn Your Bad Spending Into Viral Memes",
  description = "AI-powered meme generator that transforms your questionable expenses into hilarious, shareable content. Create viral memes from your spending habits in seconds.",
  image = "https://crylessmemes.com/og-image.jpg",
  url = "https://crylessmemes.com",
  type = "website",
  memeData = null,
  keywords = "meme generator, AI memes, spending memes, viral content, funny memes, financial humor, expense memes, money humor"
}) => {
  const siteTitle = "CryLessMemes";
  const fullTitle = title.includes(siteTitle) ? title : `${title} | ${siteTitle}`;
  
  // Dynamic content for generated memes
  if (memeData) {
    const memeTitle = `"${memeData.caption}" - Meme by CryLessMemes`;
    const memeDescription = `Check out this hilarious meme: "${memeData.caption}" - Created with AI from a spending confession. Share this viral content!`;
    const memeImage = memeData.url;
    const memeType = "article";
    
    return (
      <Helmet>
        {/* Basic Meta Tags */}
        <title>{memeTitle}</title>
        <meta name="description" content={memeDescription} />
        <meta name="keywords" content={`${keywords}, ${memeData.caption}, viral meme, funny spending`} />
        <meta name="author" content="CryLessMemes" />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href={url} />

        {/* Open Graph Tags */}
        <meta property="og:title" content={memeTitle} />
        <meta property="og:description" content={memeDescription} />
        <meta property="og:image" content={memeImage} />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:url" content={url} />
        <meta property="og:type" content={memeType} />
        <meta property="og:site_name" content={siteTitle} />
        <meta property="og:locale" content="en_US" />

        {/* Twitter Card Tags */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={memeTitle} />
        <meta name="twitter:description" content={memeDescription} />
        <meta name="twitter:image" content={memeImage} />
        <meta name="twitter:image:width" content="1200" />
        <meta name="twitter:image:height" content="630" />
        <meta name="twitter:site" content="@crylessmemes" />
        <meta name="twitter:creator" content="@crylessmemes" />

        {/* Additional Meta Tags */}
        <meta name="theme-color" content="#6366f1" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="apple-mobile-web-app-title" content={siteTitle} />
        
        {/* Article specific tags */}
        <meta property="article:author" content="CryLessMemes" />
        <meta property="article:published_time" content={new Date().toISOString()} />
        <meta property="article:section" content="Humor" />
        <meta property="article:tag" content="memes" />
        <meta property="article:tag" content="humor" />
        <meta property="article:tag" content="spending" />
      </Helmet>
    );
  }

  return (
    <Helmet>
      {/* Basic Meta Tags */}
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      <meta name="author" content="CryLessMemes" />
      <meta name="robots" content="index, follow" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <link rel="canonical" href={url} />

      {/* Open Graph Tags */}
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:url" content={url} />
      <meta property="og:type" content={type} />
      <meta property="og:site_name" content={siteTitle} />
      <meta property="og:locale" content="en_US" />

      {/* Twitter Card Tags */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />
      <meta name="twitter:image:width" content="1200" />
      <meta name="twitter:image:height" content="630" />
      <meta name="twitter:site" content="@crylessmemes" />
      <meta name="twitter:creator" content="@crylessmemes" />

      {/* Additional Meta Tags */}
      <meta name="theme-color" content="#6366f1" />
      <meta name="apple-mobile-web-app-capable" content="yes" />
      <meta name="apple-mobile-web-app-status-bar-style" content="default" />
      <meta name="apple-mobile-web-app-title" content={siteTitle} />
      
      {/* Favicon and Icons */}
      <link rel="icon" type="image/x-icon" href="/favicon.ico" />
      <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
      <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
      <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
      
      {/* Preconnect for performance */}
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      
      {/* DNS prefetch for external resources */}
      <link rel="dns-prefetch" href="//api.openai.com" />
      <link rel="dns-prefetch" href="//api.imgflip.com" />
    </Helmet>
  );
};

export default SEO;