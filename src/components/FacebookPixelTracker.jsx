import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { trackFBEvent } from '../lib/fbPixel';

const FacebookPixelTracker = () => {
  const location = useLocation();

  useEffect(() => {
    // Track PageView event on route change
    trackFBEvent('PageView', {
      page_path: location.pathname,
      page_title: document.title,
      page_location: window.location.href,
    });
    
    console.log('Facebook Pixel: PageView tracked for', location.pathname);
  }, [location]);

  return null; // This component doesn't render anything
};

export default FacebookPixelTracker;