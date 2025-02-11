[![CircleCI](https://dl.circleci.com/status-badge/img/gh/KOSASIH/PiFinance-Core/tree/main.svg?style=svg)](https://dl.circleci.com/status-badge/redirect/gh/KOSASIH/PiFinance-Core/tree/main)
[![Greetings](https://github.com/KOSASIH/PiFinance-Core/actions/workflows/greetings.yml/badge.svg)](https://github.com/KOSASIH/PiFinance-Core/actions/workflows/greetings.yml)
[![CodeQL Advanced](https://github.com/KOSASIH/PiFinance-Core/actions/workflows/codeql.yml/badge.svg)](https://github.com/KOSASIH/PiFinance-Core/actions/workflows/codeql.yml)

<p xmlns:cc="http://creativecommons.org/ns#" xmlns:dct="http://purl.org/dc/terms/"><a property="dct:title" rel="cc:attributionURL" href="https://github.com/KOSASIH/PiFinance-Core">PiFinance</a> by <a rel="cc:attributionURL dct:creator" property="cc:attributionName" href="https://www.linkedin.com/in/kosasih-81b46b5a">KOSASIH</a> is licensed under <a href="https://creativecommons.org/licenses/by/4.0/?ref=chooser-v1" target="_blank" rel="license noopener noreferrer" style="display:inline-block;">Creative Commons Attribution 4.0 International<img style="height:22px!important;margin-left:3px;vertical-align:text-bottom;" src="https://mirrors.creativecommons.org/presskit/icons/cc.svg?ref=chooser-v1" alt=""><img style="height:22px!important;margin-left:3px;vertical-align:text-bottom;" src="https://mirrors.creativecommons.org/presskit/icons/by.svg?ref=chooser-v1" alt=""></a></p>

# PiFinance-Core
The core backend implementation of the PiFinance platform, including the stablecoin mechanism, smart contracts for savings and loans, and the peer-to-peer lending system.

# PiFinance-Core

PiFinance-Core is a decentralized finance (DeFM application designed for managing stablecoins. It provides features for minting, burning, trading stablecoins, and monitoring system health. Built on the Ethereum blockchain, it aims to facilitate seamless financial transactions in a secure and efficient manner.

## Table of Contents

- [Features](#features)
- [Installation](#installation)
- [Usage](#usage)
- [API Endpoints](#api-endpoints)
- [Testing](#testing)
- [Monitoring](#monitoring)
- [Contributing](#contributing)
- [License](#license)

## Features

- Mint and burn stablecoins
- Liquidity management
- Price oracle integration
- Monitoring and alerting mechanisms
- Comprehensive logging
- Health checks for service availability

## Installation

### Prerequisites

- Node.js (version 14 or higher)
- MongoDB (for data storage)
- Redis (for caching, optional)
- An Ethereum provider (e.g., Infura)

### Steps

1. Clone the repository:
   ```bash
   git clone https://github.com/KOSASIH/PiFinance-Core.git
   cd PiFinance-Core
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file in the root directory and configure your environment variables. You can use the provided `.env.example` as a reference.

4. Start the application:
   ```bash
   npm start
   ```

## Usage

Once the application is running, you can interact with it through the API endpoints. Use tools like Postman or cURL to make requests.

### Example Request to Mint Stablecoins

```bash
curl -X POST http://localhost:3000/mint -H "Content-Type: application/json" -d '{"amount": 100}'
```

## API Endpoints

| Method | Endpoint               | Description                          |
|--------|------------------------|--------------------------------------|
| POST   | `/mint`                | Mint stablecoins                     |
| POST   | `/burn`                | Burn stablecoins                     |
| POST   | `/liquidity/add`       | Add liquidity to the pool            |
| GET    | `/health`              | Check the health of the application  |
| GET    | `/metrics`             | Get application metrics               |

## Testing

To run the tests for the application, use the following command:

```bash
npm test
```

You can also generate a coverage report with:

```bash
npm run coverage
```

## Monitoring

The application includes built-in monitoring features. Metrics can be accessed at the `/metrics` endpoint, and health checks can be performed at the `/health` endpoint.

## Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository.
2. Create a new branch (`git checkout -b feature/YourFeature`).
3. Make your changes and commit them (`git commit -m 'Add some feature'`).
4. Push to the branch (`git push origin feature/YourFeature`).
5. Open a pull request.

## License

This project is licensed under the Apache 2.0 License. See the [LICENSE](LICENSE) file for details.

