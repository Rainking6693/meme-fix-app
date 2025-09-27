import { useState } from 'react'

function StickyTopBanner() {
  const [isVisible, setIsVisible] = useState(true)

  if (!isVisible) return null

  return (
    <div className="sticky-top-banner">
      <div className="banner-content">
        <div className="banner-text">
          <h3 className="banner-headline">💸 Want to actually fix your finances?</h3>
          <p className="banner-subline">Subscribe to TaxFixHQ for weekly tax hacks, tools, and memes that save you money.</p>
        </div>
        <a 
          href="https://taxfixhq.substack.com" 
          target="_blank" 
          rel="noopener noreferrer"
          className="banner-cta"
        >
          👉 Subscribe Free
        </a>
      </div>
      <button 
        className="banner-close"
        onClick={() => setIsVisible(false)}
        aria-label="Close banner"
      >
        ×
      </button>
    </div>
  )
}

export default StickyTopBanner