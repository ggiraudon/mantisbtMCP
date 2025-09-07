import dotenv from 'dotenv';

dotenv.config();

export const config = {
  API_URL: process.env.API_URL || '',
  API_TOKEN: process.env.API_TOKEN || '',
} as const;

if (!config.API_URL) {
  throw new Error('API_URL environment variable is required');
}

if (!config.API_TOKEN) {
  throw new Error('API_TOKEN environment variable is required');
}
