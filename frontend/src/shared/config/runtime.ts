/** The portfolio demo is the default; a real deployment opts in to the API explicitly. */
export const dataMode: 'demo' | 'api' = import.meta.env.VITE_DATA_MODE === 'api' ? 'api' : 'demo';
export const isDemoMode = dataMode === 'demo';

/** Include /api/v1 in an external API URL; the default uses Vite's same-origin proxy. */
export const apiBaseUrl = (import.meta.env.VITE_API_BASE_URL?.trim() || '/api/v1').replace(/\/+$/, '');
