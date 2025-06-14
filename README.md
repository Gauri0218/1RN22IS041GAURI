# Stock Aggregator Frontend

This project is a React-based web application for aggregating stock prices and providing real-time analytical insights. It features a Stock Page for detailed stock information and a Correlation Heatmap for visualizing stock correlations.

## Features

- **Stock Page**: Displays stock price charts with options to fetch and visualize historical data.
- **Correlation Heatmap**: Visualizes correlations between different stocks, providing insights into market trends.
- **Real-time Data**: Consumes APIs to fetch live stock data and updates the UI accordingly.

## Getting Started

### Prerequisites

- Node.js (version 14 or higher)
- npm (version 6 or higher)

### Installation

1. Clone the repository:
   ```
   git clone <repository-url>
   ```
2. Navigate to the project directory:
   ```
   cd stock-aggregator-frontend
   ```
3. Install the dependencies:
   ```
   npm install
   ```

### Running the Application

To start the development server, run:
```
npm start
```
The application will be available at `http://localhost:3000`.

### Building for Production

To create a production build, run:
```
npm run build
```
This will generate a `build` folder with optimized files for deployment.

## API Usage

The application consumes a test server API to fetch stock data. Ensure that the API endpoints are correctly configured in the `src/services/api.ts` file.

## Contributing

Contributions are welcome! Please open an issue or submit a pull request for any enhancements or bug fixes.

## License

This project is licensed under the MIT License. See the LICENSE file for details.