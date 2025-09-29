// Structured Data utilities for SEO

export const generateWebApplicationSchema = () => ({
  "@context": "https://schema.org",
  "@type": "WebApplication",
  "name": "CryLessMemes",
  "description": "AI-powered meme generator that turns your spending habits into viral content",
  "url": "https://crylessmemes.com",
  "applicationCategory": "Entertainment",
  "operatingSystem": "Web Browser",
  "browserRequirements": "Requires JavaScript. Requires HTML5.",
  "offers": {
    "@type": "Offer",
    "price": "0",
    "priceCurrency": "USD",
    "availability": "https://schema.org/InStock"
  },
  "creator": {
    "@type": "Organization",
    "name": "CryLessMemes",
    "url": "https://crylessmemes.com"
  },
  "featureList": [
    "AI-powered meme generation",
    "Expense-based humor creation",
    "Social media sharing",
    "Instant meme download",
    "Viral content creation"
  ],
  "screenshot": "https://crylessmemes.com/screenshot.jpg",
  "softwareVersion": "1.0.0",
  "datePublished": "2025-01-01",
  "inLanguage": "en-US"
});

export const generateMemeSchema = (memeData, expense) => ({
  "@context": "https://schema.org",
  "@type": "CreativeWork",
  "name": `Meme: ${memeData.caption}`,
  "description": `Humorous meme generated from spending confession: "${expense}" resulting in "${memeData.caption}"`,
  "image": {
    "@type": "ImageObject",
    "url": memeData.url,
    "width": "500",
    "height": "500",
    "caption": memeData.caption
  },
  "creator": {
    "@type": "Organization",
    "name": "CryLessMemes",
    "url": "https://crylessmemes.com"
  },
  "dateCreated": new Date().toISOString(),
  "genre": ["Humor", "Meme", "Entertainment"],
  "keywords": ["meme", "humor", "spending", "financial", "viral content", "AI generated"],
  "license": "https://creativecommons.org/licenses/by/4.0/",
  "copyrightHolder": {
    "@type": "Organization",
    "name": "CryLessMemes"
  },
  "isBasedOn": {
    "@type": "Thing",
    "name": "User spending confession",
    "description": expense
  },
  "audience": {
    "@type": "Audience",
    "audienceType": "General Public"
  }
});

export const generateOrganizationSchema = () => ({
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": "CryLessMemes",
  "url": "https://crylessmemes.com",
  "logo": {
    "@type": "ImageObject",
    "url": "https://crylessmemes.com/logo.png",
    "width": "200",
    "height": "200"
  },
  "description": "AI-powered meme generator for spending habits and financial humor",
  "foundingDate": "2025",
  "sameAs": [
    "https://twitter.com/crylessmemes",
    "https://facebook.com/crylessmemes",
    "https://instagram.com/crylessmemes",
    "https://tiktok.com/@crylessmemes"
  ],
  "contactPoint": {
    "@type": "ContactPoint",
    "contactType": "Customer Service",
    "url": "https://crylessmemes.com/contact"
  },
  "address": {
    "@type": "PostalAddress",
    "addressCountry": "US"
  }
});

export const generateBreadcrumbSchema = (breadcrumbs) => ({
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": breadcrumbs.map((crumb, index) => ({
    "@type": "ListItem",
    "position": index + 1,
    "name": crumb.name,
    "item": crumb.url
  }))
});

export const generateFAQSchema = () => ({
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "How does CryLessMemes work?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Simply enter a description of your spending habit or expense, and our AI will generate a humorous meme caption. We then create a shareable meme image using the popular 'Distracted Boyfriend' template."
      }
    },
    {
      "@type": "Question",
      "name": "Is CryLessMemes free to use?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Yes! CryLessMemes is completely free to use. You can generate unlimited memes and share them on social media without any cost."
      }
    },
    {
      "@type": "Question",
      "name": "Can I download the memes I create?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Absolutely! Every meme you create can be downloaded as a high-quality image file that you can save and share anywhere."
      }
    },
    {
      "@type": "Question",
      "name": "What makes CryLessMemes different from other meme generators?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "CryLessMemes uses AI to generate witty, personalized captions based on your specific spending habits. It's designed specifically for financial humor and bad spending decisions."
      }
    }
  ]
});

export const generateHowToSchema = () => ({
  "@context": "https://schema.org",
  "@type": "HowTo",
  "name": "How to Create a Meme with CryLessMemes",
  "description": "Step-by-step guide to creating viral memes from your spending habits",
  "image": "https://crylessmemes.com/how-to-image.jpg",
  "totalTime": "PT30S",
  "estimatedCost": {
    "@type": "MonetaryAmount",
    "currency": "USD",
    "value": "0"
  },
  "supply": [
    {
      "@type": "HowToSupply",
      "name": "Internet connection"
    },
    {
      "@type": "HowToSupply", 
      "name": "Web browser"
    },
    {
      "@type": "HowToSupply",
      "name": "A questionable spending decision to share"
    }
  ],
  "step": [
    {
      "@type": "HowToStep",
      "name": "Enter your expense",
      "text": "Type in a description of your spending habit or questionable expense in the input field.",
      "image": "https://crylessmemes.com/step1.jpg"
    },
    {
      "@type": "HowToStep", 
      "name": "Generate meme",
      "text": "Click the 'Generate Meme' button and wait for our AI to create a funny caption and meme image.",
      "image": "https://crylessmemes.com/step2.jpg"
    },
    {
      "@type": "HowToStep",
      "name": "Share or download",
      "text": "Share your meme on social media or download it to save for later. Enjoy the laughs!",
      "image": "https://crylessmemes.com/step3.jpg"
    }
  ]
});

export const generateVideoObjectSchema = (videoUrl, title, description) => ({
  "@context": "https://schema.org",
  "@type": "VideoObject",
  "name": title,
  "description": description,
  "thumbnailUrl": "https://crylessmemes.com/video-thumbnail.jpg",
  "uploadDate": new Date().toISOString(),
  "duration": "PT1M30S",
  "contentUrl": videoUrl,
  "embedUrl": videoUrl,
  "publisher": {
    "@type": "Organization",
    "name": "CryLessMemes",
    "logo": {
      "@type": "ImageObject",
      "url": "https://crylessmemes.com/logo.png"
    }
  }
});