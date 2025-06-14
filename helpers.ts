export const calculateAverage = (data: number[]): number => {
    const total = data.reduce((acc, value) => acc + value, 0);
    return total / data.length;
};

export const calculateStandardDeviation = (data: number[]): number => {
    const mean = calculateAverage(data);
    const squaredDiffs = data.map(value => Math.pow(value - mean, 2));
    const averageSquaredDiff = calculateAverage(squaredDiffs);
    return Math.sqrt(averageSquaredDiff);
};

export const calculateCorrelation = (dataX: number[], dataY: number[]): number => {
    const meanX = calculateAverage(dataX);
    const meanY = calculateAverage(dataY);
    const numerator = dataX.reduce((acc, value, index) => acc + (value - meanX) * (dataY[index] - meanY), 0);
    const denominatorX = Math.sqrt(dataX.reduce((acc, value) => acc + Math.pow(value - meanX, 2), 0));
    const denominatorY = Math.sqrt(dataY.reduce((acc, value) => acc + Math.pow(value - meanY, 2), 0));
    return numerator / (denominatorX * denominatorY);
};