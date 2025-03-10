import { trackPrice } from './services/botService.js';

const startServer = async () => {
  console.log('Starting Pi Network Data Chart bot server...');

  const runBot = async () => {
    try {
      await trackPrice();
    } catch (error) {
      console.error('Bot crashed:', error.message);
      console.log('Restarting in 10 seconds...');
      await new Promise((resolve) => setTimeout(resolve, 10000));
      runBot(); // Retry
    }
  };

  runBot();

  // Graceful shutdown
  process.on('SIGINT', () => {
    console.log('Shutting down bot...');
    process.exit(0);
  });
};

startServer().catch((error) => console.error('Server error:', error.message));
