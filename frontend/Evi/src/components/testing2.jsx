// LottieComponent.jsx

import React, { useEffect } from 'react';

const LottieComponent = () => {
  useEffect(() => {
    // Load Lottie player script dynamically
    const script = document.createElement('script');
    script.src = 'https://unpkg.com/@lottiefiles/lottie-player@latest/dist/lottie-player.js';
    script.async = true;
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  return (
    <div>
      <lottie-player
        src="https://lottie.host/f0568d49-ed3a-4bd3-8332-46c92b4305af/hlVCcTCKXx.json"
        background="#FFFFFF"
        speed="1"
        style={{ width: '300px', height: '300px' }}
        loop
        controls
        autoplay
        direction="1"
        mode="normal"
      ></lottie-player>
    </div>
  );
};

export default LottieComponent;

