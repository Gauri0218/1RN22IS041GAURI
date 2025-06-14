import axios from 'axios';

const API_BASE_URL = 'https://api.example.com'; // Replace with the actual API base URL

export const getStocks = async () => {
    try {
        const response = await axios.get(`${API_BASE_URL}/stocks`);
        return response.data;
    } catch (error) {
        console.error('Error fetching stocks:', error);
        throw error;
    }
};

export const getStockPrice = async (stockSymbol: string) => {
    try {
        const response = await axios.get(`${API_BASE_URL}/stocks/${stockSymbol}/price`);
        return response.data;
    } catch (error) {
        console.error(`Error fetching price for ${stockSymbol}:`, error);
        throw error;
    }
};

// Add this function for correlation data
export const fetchCorrelationData = async () => {
    try {
        const response = await axios.get(`${API_BASE_URL}/correlation`);
        return response.data;
    } catch (error) {
        console.error('Error fetching correlation data:', error);
        throw error;
    }
};