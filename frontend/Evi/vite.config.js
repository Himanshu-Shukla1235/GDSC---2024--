// vite.config.js
import react from "@vitejs/plugin-react";

export default {
  plugins: [react()],
  server: {
    proxy: {
      "/api": {
        target: "https://api.openweathermap.org",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ""),
      },
      "/cloudinary": {
        target: "https://api.cloudinary.com",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ""),
      },
    },
  },
};
