import { useState } from 'react';

const SocialShare = ({ memeData, expense, memeUrl }) => {
  const [copied, setCopied] = useState(false);
  const [shareCount, setShareCount] = useState(0);
  
  const shareText = `Check out this hilarious meme: "${memeData.caption}" 😂 Created with CryLessMemes!`;
  const shareUrl = memeUrl || window.location.href;
  const hashtags = ['memes', 'funny', 'spending', 'viral', 'humor', 'money'];
  
  const shareLinks = {
    twitter: `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(shareUrl)}&hashtags=${hashtags.join(',')}`,
    facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`,
    linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`,
    reddit: `https://reddit.com/submit?url=${encodeURIComponent(shareUrl)}&title=${encodeURIComponent(shareText)}`,
    whatsapp: `https://wa.me/?text=${encodeURIComponent(shareText + ' ' + shareUrl)}`,
    telegram: `https://t.me/share/url?url=${encodeURIComponent(shareUrl)}&text=${encodeURIComponent(shareText)}`,
    pinterest: `https://pinterest.com/pin/create/button/?url=${encodeURIComponent(shareUrl)}&media=${encodeURIComponent(memeData.url)}&description=${encodeURIComponent(shareText)}`,
    tumblr: `https://www.tumblr.com/widgets/share/tool?posttype=photo&tags=${hashtags.join(',')}&caption=${encodeURIComponent(shareText)}&content=${encodeURIComponent(memeData.url)}&canonicalUrl=${encodeURIComponent(shareUrl)}`
  };

  const platformData = {
    twitter: { name: 'Twitter', icon: '🐦', color: '#1DA1F2' },
    facebook: { name: 'Facebook', icon: '📘', color: '#4267B2' },
    linkedin: { name: 'LinkedIn', icon: '💼', color: '#0077B5' },
    reddit: { name: 'Reddit', icon: '🤖', color: '#FF4500' },
    whatsapp: { name: 'WhatsApp', icon: '💬', color: '#25D366' },
    telegram: { name: 'Telegram', icon: '✈️', color: '#0088CC' },
    pinterest: { name: 'Pinterest', icon: '📌', color: '#BD081C' },
    tumblr: { name: 'Tumblr', icon: '📝', color: '#00CF35' }
  };

  const handleShare = (platform) => {
    // Track sharing analytics
    if (window.gtag) {
      window.gtag('event', 'share', {
        method: platform,
        content_type: 'meme',
        content_id: memeData.id || 'generated_meme',
        custom_parameters: {
          expense_category: categorizeExpense(expense),
          meme_caption: memeData.caption
        }
      });
    }

    // Open sharing window
    const width = 600;
    const height = 400;
    const left = (window.innerWidth - width) / 2;
    const top = (window.innerHeight - height) / 2;
    
    window.open(
      shareLinks[platform], 
      '_blank', 
      `width=${width},height=${height},left=${left},top=${top},scrollbars=yes,resizable=yes`
    );

    // Increment share count
    setShareCount(prev => prev + 1);
  };

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(shareUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
      
      // Track copy action
      if (window.gtag) {
        window.gtag('event', 'copy_link', {
          content_type: 'meme',
          content_id: memeData.id || 'generated_meme'
        });
      }
    } catch (err) {
      console.error('Failed to copy:', err);
      // Fallback for older browsers
      const textArea = document.createElement('textarea');
      textArea.value = shareUrl;
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand('copy');
      document.body.removeChild(textArea);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleNativeShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'Check out this hilarious meme!',
          text: shareText,
          url: shareUrl
        });
        
        // Track native share
        if (window.gtag) {
          window.gtag('event', 'share', {
            method: 'native',
            content_type: 'meme',
            content_id: memeData.id || 'generated_meme'
          });
        }
      } catch (err) {
        console.error('Error sharing:', err);
      }
    }
  };

  const categorizeExpense = (expense) => {
    const categories = {
      food: ['coffee', 'food', 'restaurant', 'eat', 'drink', 'pizza', 'burger'],
      shopping: ['clothes', 'shoes', 'buy', 'purchase', 'shopping', 'amazon'],
      entertainment: ['movie', 'game', 'concert', 'show', 'entertainment'],
      transport: ['uber', 'taxi', 'gas', 'car', 'transport'],
      other: []
    };

    const lowerExpense = expense.toLowerCase();
    for (const [category, keywords] of Object.entries(categories)) {
      if (keywords.some(keyword => lowerExpense.includes(keyword))) {
        return category;
      }
    }
    return 'other';
  };

  return (
    <div className="social-share">
      <div className="share-header">
        <h3>🚀 Share Your Meme</h3>
        <p>Spread the laughter and make your friends cry less about their spending too!</p>
        {shareCount > 0 && (
          <div className="share-count">
            <span className="count-badge">{shareCount} shares</span>
          </div>
        )}
      </div>

      {/* Native Share API for mobile */}
      {navigator.share && (
        <button
          onClick={handleNativeShare}
          className="native-share-btn"
          aria-label="Share using device's native sharing"
        >
          <span className="share-icon">📱</span>
          <span>Share</span>
        </button>
      )}

      <div className="share-buttons">
        {Object.entries(shareLinks).map(([platform, url]) => {
          const platformInfo = platformData[platform];
          return (
            <button
              key={platform}
              onClick={() => handleShare(platform)}
              className={`share-btn share-${platform}`}
              style={{ '--platform-color': platformInfo.color }}
              aria-label={`Share on ${platformInfo.name}`}
              title={`Share on ${platformInfo.name}`}
            >
              <span className="platform-icon">{platformInfo.icon}</span>
              <span className="platform-name">{platformInfo.name}</span>
            </button>
          );
        })}
      </div>
      
      <div className="copy-section">
        <button
          onClick={handleCopyLink}
          className={`copy-link-btn ${copied ? 'copied' : ''}`}
          aria-label="Copy link to clipboard"
        >
          <span className="copy-icon">{copied ? '✅' : '📋'}</span>
          <span className="copy-text">
            {copied ? 'Link Copied!' : 'Copy Link'}
          </span>
        </button>
      </div>

      <div className="share-tips">
        <h4>💡 Sharing Tips</h4>
        <ul>
          <li>Add your own commentary when sharing to increase engagement</li>
          <li>Tag friends who have similar spending habits</li>
          <li>Use relevant hashtags like #{hashtags.slice(0, 3).join(' #')}</li>
          <li>Share in relevant groups or communities for maximum reach</li>
        </ul>
      </div>

      <style jsx>{`
        .social-share {
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          border-radius: 16px;
          padding: 24px;
          margin: 20px 0;
          color: white;
          box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
        }

        .share-header {
          text-align: center;
          margin-bottom: 20px;
        }

        .share-header h3 {
          margin: 0 0 8px 0;
          font-size: 1.5rem;
          font-weight: 700;
        }

        .share-header p {
          margin: 0;
          opacity: 0.9;
          font-size: 0.95rem;
        }

        .count-badge {
          background: rgba(255, 255, 255, 0.2);
          padding: 4px 12px;
          border-radius: 20px;
          font-size: 0.85rem;
          font-weight: 600;
          margin-top: 8px;
          display: inline-block;
        }

        .native-share-btn {
          width: 100%;
          background: rgba(255, 255, 255, 0.15);
          border: 2px solid rgba(255, 255, 255, 0.3);
          color: white;
          padding: 12px 20px;
          border-radius: 12px;
          font-size: 1rem;
          font-weight: 600;
          cursor: pointer;
          margin-bottom: 16px;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          transition: all 0.3s ease;
        }

        .native-share-btn:hover {
          background: rgba(255, 255, 255, 0.25);
          transform: translateY(-2px);
        }

        .share-buttons {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));
          gap: 12px;
          margin-bottom: 20px;
        }

        .share-btn {
          background: rgba(255, 255, 255, 0.15);
          border: 2px solid rgba(255, 255, 255, 0.3);
          color: white;
          padding: 12px 8px;
          border-radius: 12px;
          font-size: 0.9rem;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s ease;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 4px;
          min-height: 70px;
        }

        .share-btn:hover {
          background: var(--platform-color, rgba(255, 255, 255, 0.25));
          transform: translateY(-2px);
          box-shadow: 0 4px 16px rgba(0, 0, 0, 0.2);
        }

        .platform-icon {
          font-size: 1.5rem;
        }

        .platform-name {
          font-size: 0.8rem;
        }

        .copy-section {
          text-align: center;
          margin-bottom: 20px;
        }

        .copy-link-btn {
          background: rgba(255, 255, 255, 0.15);
          border: 2px solid rgba(255, 255, 255, 0.3);
          color: white;
          padding: 12px 24px;
          border-radius: 12px;
          font-size: 1rem;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s ease;
          display: inline-flex;
          align-items: center;
          gap: 8px;
        }

        .copy-link-btn:hover {
          background: rgba(255, 255, 255, 0.25);
          transform: translateY(-2px);
        }

        .copy-link-btn.copied {
          background: rgba(34, 197, 94, 0.3);
          border-color: rgba(34, 197, 94, 0.5);
        }

        .share-tips {
          background: rgba(255, 255, 255, 0.1);
          border-radius: 12px;
          padding: 16px;
          margin-top: 16px;
        }

        .share-tips h4 {
          margin: 0 0 12px 0;
          font-size: 1.1rem;
          font-weight: 600;
        }

        .share-tips ul {
          margin: 0;
          padding-left: 20px;
        }

        .share-tips li {
          margin-bottom: 6px;
          font-size: 0.9rem;
          opacity: 0.9;
        }

        @media (max-width: 768px) {
          .share-buttons {
            grid-template-columns: repeat(2, 1fr);
          }
          
          .platform-name {
            font-size: 0.75rem;
          }
        }
      `}</style>
    </div>
  );
};

export default SocialShare;