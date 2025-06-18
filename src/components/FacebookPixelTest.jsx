import React from 'react';
import { trackFBEvent } from '../lib/fbPixel';

const FacebookPixelTest = () => {
  const triggerTestEvent = (eventName) => {
    trackFBEvent(eventName, {
      test_param: 'test_value',
      timestamp: new Date().toISOString()
    });
    alert(`Facebook Pixel event "${eventName}" triggered. Check browser console for details.`);
  };

  return (
    <div style={{ 
      position: 'fixed', 
      bottom: '20px', 
      right: '20px', 
      zIndex: 9999,
      backgroundColor: '#f0f0f0',
      padding: '10px',
      borderRadius: '5px',
      boxShadow: '0 0 10px rgba(0,0,0,0.1)'
    }}>
      <h4>Facebook Pixel Test</h4>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '5px' }}>
        <button 
          onClick={() => triggerTestEvent('PageView')}
          style={{ padding: '5px 10px', cursor: 'pointer' }}
        >
          Trigger PageView
        </button>
        <button 
          onClick={() => triggerTestEvent('ViewContent')}
          style={{ padding: '5px 10px', cursor: 'pointer' }}
        >
          Trigger ViewContent
        </button>
        <button 
          onClick={() => triggerTestEvent('AddToCart')}
          style={{ padding: '5px 10px', cursor: 'pointer' }}
        >
          Trigger AddToCart
        </button>
        <button 
          onClick={() => triggerTestEvent('Purchase')}
          style={{ padding: '5px 10px', cursor: 'pointer' }}
        >
          Trigger Purchase
        </button>
      </div>
    </div>
  );
};

export default FacebookPixelTest;