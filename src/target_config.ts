// src/target_config.ts
// ← ЭТОТ ФАЙЛ ТЫ ПОКАЖЕШЬ НА ЗАЩИТЕ КАК «IP сервера в коде»

// Определяем, запущено ли приложение внутри Tauri
export const isTauri = !!window.__TAURI__;

// Твой реальный IP локальной сети (поменяй на свой!)
// Чтобы узнать: в терминале Windows → ipconfig → IPv4 (обычно 192.168.xxx.xxx)
export const BACKEND_IP = "192.168.1.108";   // ← ИЗМЕНИ НА СВОЙ!

// Порт бэкенда (у тебя Django на 8000)
export const API_PORT = "8000";

// Полный URL для API
export const API_BASE = isTauri
  ? `http://${BACKEND_IP}:${API_PORT}`
  : "/api"; // в браузере и на GitHub Pages — через Vite-прокси

// Для картинок из Minio (если нужно)
export const MINIO_BASE = isTauri
  ? "http://192.168.1.108:9000"  // прямой IP
  : "/insulation-image";         // через прокси