const apiHost = typeof window === 'undefined' ? 'localhost' : window.location.hostname;

export const API_URL = import.meta.env.VITE_API_URL || `http://${apiHost}:5000`;
