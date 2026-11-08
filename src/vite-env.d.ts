/// <reference types="vite/client" />

import 'react';

declare module "*.svg?raw" {
  const content: string;
  export default content;
}

declare module 'react' {
  interface VideoHTMLAttributes<T> {
    'webkit-playsinline'?: string | boolean;
  }
}


