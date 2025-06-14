import React from 'react';
import { Link } from 'react-router-dom';

const Home: React.FC = () => {
    return (
        <div>
            <h1>Welcome to the Stock Price Aggregator</h1>
            <p>Explore stock prices and correlations in real-time.</p>
            <nav>
                <ul>
                    <li>
                        <Link to="/stock">View Stock Page</Link>
                    </li>
                    <li>
                        <Link to="/correlation-heatmap">View Correlation Heatmap</Link>
                    </li>
                </ul>
            </nav>
        </div>
    );
};

export default Home;