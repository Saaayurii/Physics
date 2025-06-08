"use client";
import { useEffect } from "react";

export function RegisterSW() {
  useEffect(() => {
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker
        .register('/sw.js')
        .then(() => console.log('✅ Service Worker зарегистрирован'))
        .catch((err) => console.error('SW регистрация не удалась:', err));
    }
  }, []);
  return null;
}
