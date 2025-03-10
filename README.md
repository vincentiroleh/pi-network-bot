# [Pi Network Data Chart Bot](https://x.com/PiNetworkChart) 🚀

A sleek Node.js bot that tweets Pi Network (PI) price updates three times daily from CoinMarketCap to X as **Pi Network Price Chart [@PiNetworkChart](https://x.com/PiNetworkChart)**, keeping the Pi community in the loop with style and precision.

![Build Status](https://github.com/vincentiroleh/pi-network-bot/actions/workflows/docker-ci.yml/badge.svg)
![License](https://img.shields.io/badge/license-MIT-blue.svg)

## Table of Contents

- [Features](#-features)
- [Tech Stack](#-tech-stack)
- [Setup](#-setup)
- [Docker](#-docker)
- [CI/CD Pipeline](#-cicd-pipeline)
- [Testing](#-testing)
- [Security](#-security)
- [Contributing](#-contributing)
- [License](#-license)

## ✨ Features

- **Thrice-Daily Updates**: Tweets the Pi price and 24-hour volume at 00:00, 08:00, and 16:00 UTC (01:00, 09:00, 17:00 WAT), plus on startup.
- **Real-Time Data**: Pulls exact prices (e.g., $2.75, not rounded) from [CoinMarketCap](https://coinmarketcap.com/currencies/pi/).
- **Rate Limit Savvy**: Stays within X’s free tier (17 tweets/day) with built-in tracking.
- **Clean Format**: Delivers tweets like:
  ![Tweet Image](/img.png)

## 🛠️ Tech Stack

- **Node.js**: The runtime environment for the bot.
- **X API**: Used for posting tweets via the `twitter-api-v2` library.
- **CoinMarketCap API**: Used for fetching price and volume data.
- **Winston**: For logging.
- **Jest**: For testing.
- **Docker**: For containerization.
- **GitHub Actions**: For CI/CD pipeline.

## 📦 Setup

### Prerequisites

- **Node.js**: Install Node.js from [nodejs.org](https://nodejs.org/).
- **Docker**: Install Docker from [docker.com](https://www.docker.com/).
- **X Developer Account** ([developer.twitter.com](https://developer.twitter.com))
- **CoinMarketCap API Key** ([coinmarketcap.com/api](https://coinmarketcap.com/api))

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

4. **Usage**:

- Run the bot:

  ```bash
  npm start
  ```

- Run tests:

  ```bash
  npm test
  ```

## 🐋 Docker

1. Build the Docker image:

   ```bash
   docker build -t pi-price-bot .
   ```

2. Run the Docker container:

   ```bash
   docker run -d -p 8080:8080 --name pi-price-bot pi-price-bot
   ```

## ♾️ CI/CD Pipeline

The project uses GitHub Actions for CI/CD. The pipeline is defined in [.github/workflows/docker-ci.yml](.github/workflows/docker-ci.yml).

## 🧪 Testing

- Local: Tweets on start + 3x daily (edit `tweetPrice` to `console.log` for mock runs).
- Rate Limits: 17 tweets/day (X free tier), 333 CMC calls/day—3x/day fits perfectly.

## 🤝 Contributing

Contributions are welcome! Please open an issue or submit a pull request.

## 📜 License

This project is licensed under the [MIT License](/LICENSE).

© 2025 [Vincent Iroleh](https://x.com/IrolehVincent)
