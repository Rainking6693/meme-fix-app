import { useEffect } from 'react';
import { initializeAnalytics, trackPageView } from '../utils/analytics';

const Analytics = ({ measurementId = 'G-XXXXXXXXXX' }) => {
  useEffect(() => {
    // Only initialize analytics in production
    if (import.meta.env.PROD && measurementId !== 'G-XXXXXXXXXX') {
      initializeAnalytics(measurementId);
      
      // Track initial page view
      trackPageView(window.location.pathname, document.title);
    }
  }, [measurementId]);

  // This component doesn't render anything
  return null;
};

export default Analytics;