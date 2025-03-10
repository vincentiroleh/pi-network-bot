import dotenv from 'dotenv';
import logger from './logger.js';

dotenv.config();

const requiredEnvVars = [
  'TWITTER_API_KEY',
  'TWITTER_API_SECRET',
  'TWITTER_ACCESS_TOKEN',
  'TWITTER_ACCESS_TOKEN_SECRET',
  'CMC_API_KEY',
  'PRICE_PRECISION',
];

const validateEnvVars = () => {
  const missingVars = requiredEnvVars.filter(
    (varName) => !process.env[varName],
  );
  if (missingVars.length > 0) {
    logger.error(
      `Missing required environment variables: ${missingVars.join(', ')}`,
    );
    process.exit(1);
  }
};

export { validateEnvVars };
