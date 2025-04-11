import { createRoot } from "react-dom/client";
import App from "./App";
import "./index.css";

// Handle WebSocket errors that might occur in Vite's hot module replacement
// This prevents the application from crashing due to WebSocket connection issues
window.addEventListener('error', (event) => {
  // Check if the error is related to WebSocket
  if (
    event.message.includes('WebSocket') ||
    (event.error && event.error.toString().includes('WebSocket'))
  ) {
    // Prevent the error from stopping the application
    event.preventDefault();
    console.warn('WebSocket connection error handled:', event.message);
  }
});

// Also prevent unhandled promise rejections related to WebSocket
window.addEventListener('unhandledrejection', (event) => {
  if (
    event.reason && 
    (event.reason.message?.includes('WebSocket') || 
    event.reason.toString().includes('WebSocket'))
  ) {
    event.preventDefault();
    console.warn('WebSocket promise rejection handled:', event.reason);
  }
});

createRoot(document.getElementById("root")!).render(
  <App />
);
