import {
  tweetPrice,
  shouldTweet,
  fetchAndTweetPrice,
  resetIntervalId,
} from '../botService.js';
import xClient from '../../config/xClient.js';
import { getPiPrice } from '../../config/cmcClient.js';
import logger from '../../config/logger.js';

jest.mock('../../config/xClient.js', () => ({
  v2: {
    tweet: jest.fn(),
  },
}));
jest.mock('../../config/cmcClient.js');
jest.mock('../../config/logger.js');

describe('botService', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  afterAll(() => {
    clearInterval(resetIntervalId);
  });

  describe('shouldTweet', () => {
    it('should return true if current time is within tweet times and not the last tweet hour', () => {
      expect(shouldTweet(0, 3, 23)).toBe(true);
      expect(shouldTweet(8, 4, 7)).toBe(true);
      expect(shouldTweet(16, 2, 15)).toBe(true);
    });

    it('should return false if current time is not within tweet times', () => {
      expect(shouldTweet(1, 3, 0)).toBe(false);
      expect(shouldTweet(9, 4, 8)).toBe(false);
      expect(shouldTweet(17, 2, 16)).toBe(false);
    });

    it('should return false if current minute is not within the first 5 minutes', () => {
      expect(shouldTweet(0, 6, 23)).toBe(false);
      expect(shouldTweet(8, 10, 7)).toBe(false);
      expect(shouldTweet(16, 7, 15)).toBe(false);
    });

    it('should return false if current hour is the last tweet hour', () => {
      expect(shouldTweet(0, 3, 0)).toBe(false);
      expect(shouldTweet(8, 4, 8)).toBe(false);
      expect(shouldTweet(16, 2, 16)).toBe(false);
    });
  });

  describe('fetchAndTweetPrice', () => {
    it('should fetch price and tweet if data is available', async () => {
      getPiPrice.mockResolvedValue({ price: 2.75, volume24h: 1200000 });
      xClient.v2.tweet.mockResolvedValue({});

      const lastTweetHour = await fetchAndTweetPrice(23);

      expect(getPiPrice).toHaveBeenCalledTimes(1);
      expect(xClient.v2.tweet).toHaveBeenCalledTimes(1);
      expect(lastTweetHour).toBe(new Date().getUTCHours());
    });

    it('should log error and return last tweet hour if data is not available', async () => {
      getPiPrice.mockResolvedValue(null);

      const lastTweetHour = await fetchAndTweetPrice(23);

      expect(getPiPrice).toHaveBeenCalledTimes(1);
      expect(xClient.v2.tweet).not.toHaveBeenCalled();
      expect(logger.error).toHaveBeenCalledWith(
        'Price fetch failed at scheduled time',
      );
      expect(lastTweetHour).toBe(23);
    });
  });
});
