import axios from 'axios';
import dotenv from 'dotenv';

dotenv.config();

const cmcClient = axios.create({
  baseURL: 'https://pro-api.coinmarketcap.com',
  headers: { 'X-CMC_PRO_API_KEY': process.env.CMC_API_KEY },
});

const getPiPrice = async () => {
  try {
    const response = await cmcClient.get('/v1/cryptocurrency/quotes/latest', {
      params: { symbol: 'PI', convert: 'USD' },
    });
    const data = response.data.data.PI.quote.USD;
    return {
      price: Number(data.price), // Exact price (e.g., 2.75)
      volume24h: Number(data.volume_24h), // Raw volume
    };
  } catch (error) {
    console.error('CMC API error:', error.response?.data || error.message);
    return null;
  }
};

export { getPiPrice };
