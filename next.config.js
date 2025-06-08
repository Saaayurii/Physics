const withPWA = require("next-pwa")({
  dest: "public",
  register: true,
  skipWaiting: true,
  runtimeCaching: [
    {
      urlPattern: /^https:\/\/(googleusercontent\.com|cdn\.openai\.com|oaidalleapiprodscus\.blob\.core\.windows\.net)/,
      handler: "CacheFirst",
      options: {
        cacheName: "images",
        expiration: {
          maxEntries: 50,
          maxAgeSeconds: 60 * 60 * 24 * 30, // 30 days
        },
      },
    },
    {
      urlPattern: /^https?.*/, // все HTML/CSS/JS запросы
      handler: "NetworkFirst",
      options: {
        cacheName: "pages",
        networkTimeoutSeconds: 3,
        expiration: {
          maxEntries: 100,
          maxAgeSeconds: 60 * 60 * 24 * 7, // 7 дней
        },
      },
    },
  ],
  fallbacks: {
    // fallback HTML если оффлайн
    document: "/offline.html",
    // fallback изображений и пр.
  },
});

const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "googleusercontent.com" },
      { protocol: "https", hostname: "oaidalleapiprodscus.blob.core.windows.net" },
      { protocol: "https", hostname: "cdn.openai.com" },
    ],
  },
};

module.exports = withPWA(nextConfig);
