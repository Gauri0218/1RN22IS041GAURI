export interface Stock {
    symbol: string;
    name: string;
    price: number;
    change: number;
    volume: number;
}

export interface CorrelationData {
    stock1: string;
    stock2: string;
    correlation: number;
}

export interface StockPriceHistory {
    date: string;
    price: number;
}

export interface StockResponse {
    stocks: Stock[];
}

export interface StockPriceResponse {
    symbol: string;
    history: StockPriceHistory[];
}

export interface CorrelationResponse {
    correlations: CorrelationData[];
}