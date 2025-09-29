// Analytics utilities for tracking SEO and user behavior

// Google Analytics 4 setup
export const initializeGA = (measurementId) => {
  if (typeof window === 'undefined') return;
  
  // Load Google Analytics script
  const script = document.createElement('script');
  script.async = true;
  script.src = `https://www.googletagmanager.com/gtag/js?id=${measurementId}`;
  document.head.appendChild(script);

  // Initialize gtag
  window.dataLayer = window.dataLayer || [];
  function gtag() {
    window.dataLayer.push(arguments);
  }
  window.gtag = gtag;
  
  gtag('js', new Date());
  gtag('config', measurementId, {
    page_title: document.title,
    page_location: window.location.href,
    send_page_view: true
  });
};

// Track meme generation events
export const trackMemeGeneration = (expense, caption, success = true) => {
  if (typeof window.gtag === 'function') {
    window.gtag('event', 'meme_generated', {
      event_category: 'engagement',
      event_label: success ? 'success' : 'failure',
      custom_parameters: {
        expense_length: expense.length,
        caption_length: caption?.length || 0,
        expense_category: categorizeExpense(expense),
        generation_time: new Date().toISOString()
      }
    });
  }
};

// Track social sharing events
export const trackSocialShare = (platform, memeData, expense) => {
  if (typeof window.gtag === 'function') {
    window.gtag('event', 'share', {
      method: platform,
      content_type: 'meme',
      content_id: memeData.id || 'generated_meme',
      custom_parameters: {
        expense_category: categorizeExpense(expense),
        caption_length: memeData.caption.length,
        share_platform: platform
      }
    });
  }
};

// Track page views for SPA
export const trackPageView = (path, title) => {
  if (typeof window.gtag === 'function') {
    window.gtag('config', 'GA_MEASUREMENT_ID', {
      page_path: path,
      page_title: title,
      page_location: window.location.href
    });
  }
};

// Track user engagement
export const trackEngagement = (action, category = 'engagement', label = '') => {
  if (typeof window.gtag === 'function') {
    window.gtag('event', action, {
      event_category: category,
      event_label: label,
      engagement_time_msec: Date.now()
    });
  }
};

// Track errors
export const trackError = (error, context = 'general') => {
  if (typeof window.gtag === 'function') {
    window.gtag('event', 'exception', {
      description: error.message || error,
      fatal: false,
      custom_parameters: {
        error_context: context,
        error_stack: error.stack || 'No stack trace',
        user_agent: navigator.userAgent,
        timestamp: new Date().toISOString()
      }
    });
  }
};

// Track performance metrics
export const trackPerformance = () => {
  if (typeof window.gtag === 'function' && 'performance' in window) {
    const navigation = performance.getEntriesByType('navigation')[0];
    const paint = performance.getEntriesByType('paint');
    
    if (navigation) {
      window.gtag('event', 'timing_complete', {
        name: 'page_load',
        value: Math.round(navigation.loadEventEnd - navigation.fetchStart)
      });
      
      window.gtag('event', 'timing_complete', {
        name: 'dom_content_loaded',
        value: Math.round(navigation.domContentLoadedEventEnd - navigation.fetchStart)
      });
    }
    
    paint.forEach(entry => {
      window.gtag('event', 'timing_complete', {
        name: entry.name.replace('-', '_'),
        value: Math.round(entry.startTime)
      });
    });
  }
};

// Track Core Web Vitals
export const trackWebVitals = () => {
  if (typeof window === 'undefined') return;
  
  // Track LCP (Largest Contentful Paint)
  if ('PerformanceObserver' in window) {
    const lcpObserver = new PerformanceObserver((list) => {
      const entries = list.getEntries();
      const lastEntry = entries[entries.length - 1];
      
      if (typeof window.gtag === 'function') {
        window.gtag('event', 'web_vital', {
          name: 'LCP',
          value: Math.round(lastEntry.startTime),
          event_category: 'performance'
        });
      }
    });
    
    lcpObserver.observe({ entryTypes: ['largest-contentful-paint'] });
    
    // Track FID (First Input Delay)
    const fidObserver = new PerformanceObserver((list) => {
      const entries = list.getEntries();
      entries.forEach(entry => {
        if (typeof window.gtag === 'function') {
          window.gtag('event', 'web_vital', {
            name: 'FID',
            value: Math.round(entry.processingStart - entry.startTime),
            event_category: 'performance'
          });
        }
      });
    });
    
    fidObserver.observe({ entryTypes: ['first-input'] });
    
    // Track CLS (Cumulative Layout Shift)
    let clsValue = 0;
    const clsObserver = new PerformanceObserver((list) => {
      const entries = list.getEntries();
      entries.forEach(entry => {
        if (!entry.hadRecentInput) {
          clsValue += entry.value;
        }
      });
      
      if (typeof window.gtag === 'function') {
        window.gtag('event', 'web_vital', {
          name: 'CLS',
          value: Math.round(clsValue * 1000),
          event_category: 'performance'
        });
      }
    });
    
    clsObserver.observe({ entryTypes: ['layout-shift'] });
  }
};

// Utility function to categorize expenses
const categorizeExpense = (expense) => {
  const categories = {
    food: ['coffee', 'food', 'restaurant', 'eat', 'drink', 'pizza', 'burger', 'lunch', 'dinner', 'breakfast'],
    shopping: ['clothes', 'shoes', 'buy', 'purchase', 'shopping', 'amazon', 'store', 'mall'],
    entertainment: ['movie', 'game', 'concert', 'show', 'entertainment', 'netflix', 'spotify', 'gaming'],
    transport: ['uber', 'taxi', 'gas', 'car', 'transport', 'bus', 'train', 'flight'],
    subscription: ['subscription', 'monthly', 'premium', 'pro', 'plus', 'membership'],
    impulse: ['impulse', 'random', 'saw', 'wanted', 'needed', 'sale', 'discount'],
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

// Track scroll depth
export const trackScrollDepth = () => {
  let maxScroll = 0;
  const thresholds = [25, 50, 75, 90, 100];
  const tracked = new Set();
  
  const handleScroll = () => {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const scrollPercent = Math.round((scrollTop / docHeight) * 100);
    
    if (scrollPercent > maxScroll) {
      maxScroll = scrollPercent;
      
      thresholds.forEach(threshold => {
        if (scrollPercent >= threshold && !tracked.has(threshold)) {
          tracked.add(threshold);
          
          if (typeof window.gtag === 'function') {
            window.gtag('event', 'scroll', {
              event_category: 'engagement',
              event_label: `${threshold}%`,
              value: threshold
            });
          }
        }
      });
    }
  };
  
  window.addEventListener('scroll', handleScroll, { passive: true });
  
  return () => {
    window.removeEventListener('scroll', handleScroll);
  };
};

// Track time on page
export const trackTimeOnPage = () => {
  const startTime = Date.now();
  
  const sendTimeOnPage = () => {
    const timeOnPage = Math.round((Date.now() - startTime) / 1000);
    
    if (typeof window.gtag === 'function') {
      window.gtag('event', 'timing_complete', {
        name: 'time_on_page',
        value: timeOnPage,
        event_category: 'engagement'
      });
    }
  };
  
  // Send time on page when user leaves
  window.addEventListener('beforeunload', sendTimeOnPage);
  
  // Also send at intervals for long sessions
  const interval = setInterval(() => {
    sendTimeOnPage();
  }, 30000); // Every 30 seconds
  
  return () => {
    clearInterval(interval);
    window.removeEventListener('beforeunload', sendTimeOnPage);
  };
};

// Initialize all tracking
export const initializeAnalytics = (measurementId) => {
  if (typeof window === 'undefined') return;
  
  // Initialize GA
  initializeGA(measurementId);
  
  // Track performance metrics
  window.addEventListener('load', () => {
    setTimeout(() => {
      trackPerformance();
      trackWebVitals();
    }, 1000);
  });
  
  // Track scroll depth
  trackScrollDepth();
  
  // Track time on page
  trackTimeOnPage();
  
  // Track errors
  window.addEventListener('error', (event) => {
    trackError(event.error, 'javascript_error');
  });
  
  window.addEventListener('unhandledrejection', (event) => {
    trackError(event.reason, 'promise_rejection');
  });
};