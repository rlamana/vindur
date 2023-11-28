import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  ChartOptions,
  ChartData,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { useMemo } from 'react';
import { Card, CardContent } from '@mui/material';

import { Interval } from './model/weather';

import styles from './WindGraph.module.css';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

interface WindGraphProps {
  intervals: Interval[];
}

const WindGraph: React.FC<WindGraphProps> = ({ intervals }) => {
  const labels = ['1h', '2h', '3h', '4h', '5h', '6h', '7h', '8h', '9h', '10h', '11h', '12h'];

  const options: ChartOptions<'line'> = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
      },
      title: {
        display: false,
      },
    },
  };

  const data = useMemo<ChartData<'line'>>(() => {
    return {
      labels,
      datasets: [
        {
          label: 'Wind Gust',
          data: intervals.map(({ values }) => values.windGust).slice(0, 12),
          borderColor: 'rgb(255, 99, 132)',
          backgroundColor: 'rgba(255, 99, 132, 0.5)',
        },
        {
          label: 'Wind Speed',
          data: intervals.map(({ values }) => values.windSpeed).slice(0, 12),
          borderColor: 'rgb(53, 162, 235)',
          backgroundColor: 'rgba(53, 162, 235, 0.5)',
        },
      ],
    }
  }, [intervals]);

  return (
    <Card className={styles.WindGraph}>
      <CardContent>
        <Line options={options} data={data} />
      </CardContent>
    </Card>
  );

};

export default WindGraph;