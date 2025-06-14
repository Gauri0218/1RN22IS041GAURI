import React, { useEffect, useState } from 'react';
import { fetchCorrelationData } from '../services/api';
import { Box, Typography, CircularProgress, Paper, Tooltip } from '@mui/material';
// Use Unstable_Grid2 for MUI v5+ grid API without 'item'/'container' props
import Grid from '@mui/material/Unstable_Grid2';

interface CorrelationData {
  label: string;
  values: number[];
}

const CorrelationHeatmap: React.FC = () => {
    const [correlationData, setCorrelationData] = useState<CorrelationData[]>([]);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        const getCorrelationData = async () => {
            try {
                const data = await fetchCorrelationData();
                let formatted: CorrelationData[] = [];
                if (!Array.isArray(data)) {
                    formatted = Object.entries(data).map(
                        ([label, values]: [string, number[]]) => ({
                            label,
                            values,
                        })
                    );
                } else {
                    formatted = data;
                }
                setCorrelationData(formatted);
            } catch (error) {
                console.error("Error fetching correlation data:", error);
            } finally {
                setLoading(false);
            }
        };

        getCorrelationData();
    }, []);

    const getColor = (value: number) => {
        if (value > 0.7) return '#e57373';
        if (value > 0.3) return '#ffccbc';
        if (value > -0.3) return '#fffde7';
        if (value > -0.7) return '#bbdefb';
        return '#64b5f6';
    };

    const renderHeatmap = () => {
        if (!correlationData.length) return <Typography>No data available.</Typography>;

        const labels = correlationData.map(item => item.label);

        return (
            <Box sx={{ overflowX: 'auto' }}>
                <Grid container>
                    <Grid xs={2}>
                        <Box sx={{ width: 100 }} />
                    </Grid>
                    {labels.map((label) => (
                        <Grid xs={1} key={label}>
                            <Typography variant="caption" sx={{ writingMode: 'vertical-rl', textAlign: 'center' }}>
                                {label}
                            </Typography>
                        </Grid>
                    ))}
                </Grid>
                {correlationData.map((row) => (
                    <Grid container key={row.label}>
                        <Grid xs={2}>
                            <Typography variant="caption">{row.label}</Typography>
                        </Grid>
                        {row.values.map((value, colIdx) => (
                            <Grid xs={1} key={colIdx}>
                                <Tooltip title={`Correlation: ${value.toFixed(2)}`}>
                                    <Paper
                                        sx={{
                                            height: 32,
                                            width: 32,
                                            bgcolor: getColor(value),
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            cursor: 'pointer',
                                            transition: '0.2s',
                                        }}
                                        elevation={2}
                                    >
                                        <Typography variant="caption">{value.toFixed(2)}</Typography>
                                    </Paper>
                                </Tooltip>
                            </Grid>
                        ))}
                    </Grid>
                ))}
            </Box>
        );
    };

    if (loading) {
        return (
            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: 200 }}>
                <CircularProgress />
            </Box>
        );
    }

    return (
        <Box sx={{ p: 3, bgcolor: 'white', borderRadius: 2, boxShadow: 2 }}>
            <Typography variant="h5" color="primary" gutterBottom>
                Correlation Heatmap
            </Typography>
            {renderHeatmap()}
        </Box>
    );
};

export default CorrelationHeatmap;