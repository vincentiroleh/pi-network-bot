import xClient from '../config/xClient.js';
import { getPiPrice } from '../config/cmcClient.js';
import dotenv from 'dotenv';

dotenv.config();

const PRICE_PRECISION = Number(process.env.PRICE_PRECISION) || 2;

let tweetCount = 0;
const TWEET_LIMIT = 17;
const RESET_INTERVAL = 24 * 60 * 60 * 1000;
setInterval(() => { tweetCount = 0; }, RESET_INTERVAL);

const formatDate = () => {
  const now = new Date();
  const options = { weekday: 'short', day: 'numeric', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit', hour12: true, timeZone: 'UTC' };
  const parts = new Intl.DateTimeFormat('en-US', options).formatToParts(now);
  const dateStr = `${parts.find(p => p.type === 'weekday').value} ${parts.find(p => p.type === 'day').value} ${parts.find(p => p.type === 'month').value}, ${parts.find(p => p.type === 'year').value}`;
  const timeStr = `${parts.find(p => p.type === 'hour').value}:${parts.find(p => p.type === 'minute').value} ${parts.find(p => p.type === 'dayPeriod').value}`;
  return `${dateStr} • ${timeStr}`;
};

const tweetPrice = async ({ price, volume24h }) => {
  if (tweetCount >= TWEET_LIMIT) {
    console.log(`Rate limit reached (${tweetCount}/${TWEET_LIMIT}), skipping tweet...`);
    return;
  }
  const formattedDate = formatDate();
  const volumeStr = (volume24h / 1e6).toFixed(1);
  const message = `${formattedDate}\n🪙 1 PI ⇛ $${price.toFixed(PRICE_PRECISION)}\n📊 24h Vol: $${volumeStr}M\n#PiNetwork #PiPrice #PiNetworkPrice #Pi`;
  try {
    await xClient.v2.tweet(message);
    tweetCount++;
    console.log(`Tweeted (${tweetCount}/${TWEET_LIMIT}): \n${message}`);
  } catch (error) {
    console.error('Tweet error:', error.message);
  }
};

const trackPrice = async () => {
  let lastTweetDay = null;

  while (true) {
    const now = new Date();
    const currentDay = now.getUTCDate();
    const currentHour = now.getUTCHours();
    const currentMinute = now.getUTCMinutes();

    const tweetTimes = [0, 8, 16];
    if (tweetTimes.includes(currentHour) && currentMinute < 5 && currentDay !== lastTweetDay) {
      const data = await getPiPrice();
      if (data !== null) {
        const { price, volume24h } = data;
        await tweetPrice({ price, volume24h });
        lastTweetDay = currentDay; // Reset after all 3 tweets
        if (currentHour === 16) lastTweetDay = currentDay; // Only reset after last tweet
      } else {
        console.log('Price fetch failed at scheduled time');
      }
    } else {
      console.log(`Waiting for next tweet time (00:00, 08:00, 16:00 UTC)... Current time: ${formatDate()}`);
    }

    await new Promise((resolve) => setTimeout(resolve, 60000));
  }
};

export { tweetPrice, trackPrice };