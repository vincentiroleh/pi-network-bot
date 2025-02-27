# Pi Network Data Chart Bot 🚀

A sleek Node.js bot that tweets daily Pi Network (PI) price updates straight from CoinMarketCap to X, keeping the Pi community in the loop with style and precision.

## ✨ Features
- **Daily Updates**: Tweets the Pi price and 24-hour volume at 12:00 UTC every day.
- **Real-Time Data**: Pulls exact prices (e.g., $2.75, not rounded) from [CoinMarketCap](https://coinmarketcap.com/currencies/pi/).
- **Rate Limit Savvy**: Stays within X’s free tier (17 tweets/day) with built-in tracking.
- **Clean Format**: Delivers tweets like:
    ![Tweet Image](/img.png)
- **Modular Design**: ES6 syntax with separate config and service files for easy tweaks.

## 🛠️ Tech Stack
- **Node.js**: Powers the bot with modern ES6 (e.g., `import`, arrow functions).
- **X API**: Posts tweets via `twitter-api-v2`.
- **CoinMarketCap API**: Fetches price and volume with `axios`.
- **dotenv**: Secures API keys in `.env`.

## 📦 Setup
### Prerequisites
- Node.js (v14+)
- X Developer Account ([developer.twitter.com](https://developer.twitter.com))
- CoinMarketCap API Key ([coinmarketcap.com/api](https://coinmarketcap.com/api))

### Installation

1. **Clone the Repo**:
 ```bash
 git clone https://github.com/vincentiroleh/pi-network-bot.git
 cd pi-network-bot
```

2. **Install Dependencies**:

```bash
npm install
```

3. **Set Up Environment Variables**:

- Create a .env file in the root:

```
TWITTER_API_KEY=your_x_api_key
TWITTER_API_SECRET=your_x_api_secret
TWITTER_ACCESS_TOKEN=your_x_access_token
TWITTER_ACCESS_TOKEN_SECRET=your_x_access_token_secret
CMC_API_KEY=your_cmc_api_key
PRICE_PRECISION=2  # Optional: decimals for price (default: 2)
```
- Get X keys from your app (set to “Read and Write”).
- Get CMC key from your developer dashboard.

4. **Run Locally**:
```bash
node index.js
```
- Logs “Waiting for 12:00 UTC...” until it tweets daily.

## 🚀 Deployment

Deploy to Heroku for 24/7 uptime:

1. **Heroku Setup**:

```bash
heroku create pi-network-bot
git push heroku main
heroku ps:scale worker=1
```

2. **Add Config Vars**:
- In Heroku dashboard > Settings > Config Vars, add .env values.

## 🧪 Testing
- Local: Runs a mock tweet at 12:00 UTC daily (edit trackPrice to console.log instead of tweet for dry runs).
- Rate Limits: 17 tweets/day (X free tier), 333 CMC calls/day—daily tweet fits perfectly.

## 📜 Project Structure
```
pi-network-bot/
├── config/
│   ├── xClient.js         # X API client setup
│   └── cmcClient.js       # CoinMarketCap API client
├── services/
│   └── botService.js      # Tweet and tracking logic
├── index.js               # App server entry point
├── .env                   # API keys (not tracked)
├── .gitignore             # Ignores .env, node_modules
├── package.json           # Dependencies and ES6 module config
└── README.md              # You’re here!
```

## 🌟 Why This Rocks
- Keeps Pi fans updated with minimal fuss.
- Scales easily—add percent change or error tweets anytime.
- Built for the free tier, no cost to run.

## 🤝 Contributing
- Got ideas? Fork it, tweak it, PR it—let’s make it even cooler!


© 2025 [Vincent Iroleh](https://x.com/IrolehVincent) | [MIT License](/LICENSE)

