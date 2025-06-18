// Facebook Pixel and Conversion API utility
import { sendFacebookConversionEvent } from '../services/api';

// Facebook Pixel ID
export const FB_PIXEL_ID = '1238400481630068';

// Facebook Conversion API Token
export const FB_CONVERSION_API_TOKEN = 'EAAbMvJbLSKUBO5ToXa58TqAnfNW1xhF9wjAZAMX4WXd1hZCnEwOrWru1IZAbg8ZA9rbGQEBSmbSFJl32bZAjJRMmHOlTSozrKOJQslux6cs6EOQCIgPHHopmtTSXPXwmdYxga1xuJdTZBTB0IE7UKUgqPsWYWtWmhnm4v2t4sAMTRvdIA3TbqogJVPcX0HL75ZAVAZDZD';

// Initialize Facebook Pixel
export const initFacebookPixel = () => {
  if (window.fbq) return;

  // Standard Facebook Pixel initialization
  window.fbq('init', FB_PIXEL_ID);
  window.fbq('track', 'PageView');
  console.log('Facebook Pixel initialized with ID:', FB_PIXEL_ID);
};

// Track a custom event with both Pixel and Conversion API
export const trackFBEvent = (eventName, params = {}) => {
  // Client-side tracking with Pixel
  if (window.fbq) {
    window.fbq('track', eventName, params);
    console.log(`[FB Pixel] Tracked event: ${eventName}`, params);
  } else {
    console.warn('[FB Pixel] fbq not available. Make sure Meta Pixel is properly initialized.');
    // Try to initialize it again
    initFacebookPixel();
    if (window.fbq) {
      window.fbq('track', eventName, params);
    }
  }

  // Server-side tracking with Conversion API
  try {
    // Get user data for more accurate tracking
    const userData = {
      client_user_agent: navigator.userAgent,
      client_ip_address: null, // This will be filled on the server side
      fbp: getCookie('_fbp'),
      fbc: getCookie('_fbc') || getURLParameter('fbclid') ? `fb.1.${Date.now()}.${getURLParameter('fbclid')}` : null,
    };

    // Prepare event data
    const eventData = {
      token: FB_CONVERSION_API_TOKEN,
      data: {
        event_name: eventName,
        event_time: Math.floor(Date.now() / 1000),
        event_source_url: window.location.href,
        event_id: `${eventName}_${Date.now()}`,
        user_data: userData,
        custom_data: params,
      }
    };

    // Send to your backend endpoint that will forward to Facebook
    sendFacebookConversionEvent(eventData)
      .then(response => {
        console.log('[FB Conversion API] Event sent successfully:', response);
      })
      .catch(error => {
        console.error('[FB Conversion API] Error sending event:', error);
      });
  } catch (error) {
    console.error('[FB Conversion API] Error:', error);
  }
};

// Helper function to get cookies
const getCookie = (name) => {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop().split(';').shift();
  return null;
};

// Helper function to get URL parameters
const getURLParameter = (name) => {
  const searchParams = new URLSearchParams(window.location.search);
  return searchParams.get(name);
};

// Track page views automatically
export const trackPageView = () => {
  trackFBEvent('PageView');
};

export default {
  initFacebookPixel,
  trackFBEvent,
  trackPageView,
};