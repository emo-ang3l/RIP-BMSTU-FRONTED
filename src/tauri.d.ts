// src/tauri.d.ts
interface Window {
  __TAURI__?: any;
}

// Это нужно, чтобы TypeScript понимал, что __TAURI__ может существовать
declare global {
  interface Window {
    __TAURI__?: any;
  }
}

export {};