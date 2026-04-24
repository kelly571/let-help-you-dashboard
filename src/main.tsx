import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";

// Dynamically inject manifest for PWA support since index.html is protected
const injectManifest = () => {
  if (!document.querySelector('link[rel="manifest"]')) {
    const link = document.createElement('link');
    link.rel = 'manifest';
    link.href = './manifest.json';
    document.head.appendChild(link);
  }
  
  // Also inject theme color and mobile meta tags
  const meta = document.createElement('meta');
  meta.name = 'theme-color';
  meta.content = '#059669';
  document.head.appendChild(meta);
};

injectManifest();

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);