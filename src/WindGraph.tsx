import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  ChartData,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Colors,
  Plugin,
  Filler,
} from 'chart.js';
import { useMemo } from 'react';
import dayjs from 'dayjs';

import { Interval } from './model/weather';
import { Box } from '@mui/material';

const CanvasBackground: Plugin<'line'> = {
  id: 'CanvasBackground',
  beforeDraw: (chart, _, options) => {
    const { ctx } = chart;
    ctx.save();
    ctx.globalCompositeOperation = 'destination-over';
    ctx.fillStyle = options.color || '#99ffff';
    ctx.fillRect(0, 0, chart.width, chart.height);
    ctx.restore();
  },
};

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Colors,
  Filler,
  CanvasBackground
);

interface WindGraphProps {
  intervals: Interval[];
}

const WindGraph: React.FC<WindGraphProps> = ({ intervals }) => {
  const options = {
    responsive: true,
    plugins: {
      legend: {
        display: false,
      },
      title: {
        display: false,
      },
      CanvasBackground: {
        color: '#000',
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        max: 45,
        grid: {
          display: false,
        },
        position: 'right',
      },
      x: {
        grid: {
          display: false,
        },
      },
    },
  };

  const data = useMemo<ChartData<'line'>>(() => {
    const next12hours = intervals.slice(0, 12);
    const labels = next12hours.map(
      ({ startTime }) => dayjs(startTime).format('HH') + 'h'
    );

    return {
      labels,
      datasets: [
        {
          label: 'Wind Gust',
          data: next12hours.map(({ values }) => values.windGust),
          borderColor: 'rgba(53, 162, 235, 0.5)',
          borderDash: [5, 5],
          borderJoinStyle: 'round',
          borderCapStyle: 'round',
          tension: 0.1,
          pointStyle: false,
        },
        {
          label: 'Wind Speed',
          data: next12hours.map(({ values }) => values.windSpeed),
          borderColor: 'rgb(53, 162, 235)',
          borderJoinStyle: 'round',
          borderCapStyle: 'round',
          tension: 0.1,
          pointStyle: false,
          fill: {
            target: 'origin',
            above: 'rgba(53, 162, 235, .2)',
          },
        },
      ],
    };
  }, [intervals]);

  return (
    <Box
      sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}
    >
      <Line
        updateMode="resize"
        options={options as any}
        data={data}
        style={{
          display: 'flex',
          flexDirection: 'column',
          maxWidth: '500px',
          maxHeight: '300px',
        }}
      />
    </Box>
  );
};

export default WindGraph;
