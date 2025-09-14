// API endpoints
export const API_ENDPOINTS = {
  AUTH: '/api/auth',
  USER: '/api/user',
} as const;

// App routes
export const ROUTES = {
  HOME: '/',
  LOGIN: '/login',
  DASHBOARD: '/dashboard',
  TERMS: '/terms',
  PRIVACY: '/privacy',
} as const;

// Firebase config keys
export const FIREBASE_CONFIG_KEYS = {
  API_KEY: 'NEXT_PUBLIC_FIREBASE_API_KEY',
  AUTH_DOMAIN: 'NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN',
  PROJECT_ID: 'NEXT_PUBLIC_FIREBASE_PROJECT_ID',
} as const;