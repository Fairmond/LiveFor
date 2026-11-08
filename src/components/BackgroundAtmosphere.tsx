import React from 'react';

export const BackgroundAtmosphere: React.FC = () => {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-visible select-none" aria-hidden="true">
      <svg
        className="absolute w-full h-full overflow-visible"
        viewBox="0 0 1440 700"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <g filter="url(#atmosphere-blur)">
          <path 
            d="M521.387 406.317C844.687 571.051 1130.05 658.919 1158.76 602.575C1187.47 546.232 948.653 367.012 625.353 202.278C302.053 37.5436 16.6925 -50.3243 -12.0169 6.0195C-40.7264 62.3633 198.087 241.583 521.387 406.317Z" 
            fill="white" 
          />
        </g>
        <defs>
          <filter 
            id="atmosphere-blur" 
            x="-100" 
            y="-100" 
            width="1640" 
            height="900" 
            filterUnits="userSpaceOnUse" 
            colorInterpolationFilters="sRGB"
          >
            <feFlood floodOpacity="0" result="BackgroundImageFix" />
            <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
            <feGaussianBlur stdDeviation="25" result="effect1_foregroundBlur_0_1" />
          </filter>
        </defs>
      </svg>
    </div>
  );
};
