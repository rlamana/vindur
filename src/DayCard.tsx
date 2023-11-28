import React from 'react';
import { CardContent, Card, Typography, Box } from '@mui/material';
import { Interval } from './model/weather';
import AirIcon from '@mui/icons-material/Air';
import dayjs from 'dayjs';
import { ArrowCircleUp } from '@mui/icons-material';
import ConditionBadge from './ConditionBadge';

interface DayCardProps {
  day: Interval;
}

const DayCard: React.FC<DayCardProps> = ({ day }) => {
  return (
    <Card
      sx={{
        backgroundImage: 'none',
        borderBottom: '1px solid',
        borderColor: 'divider',
      }}
    >
      <CardContent
        sx={{
          px: 0,
        }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <ConditionBadge interval={day} />
          <Typography variant="h6">
            {dayjs(day.startTime).format('dddd')}
          </Typography>
          <Box sx={{ flex: 1 }} />
          <Typography variant="body2" sx={{ opacity: 0.7 }}>
            {dayjs(day.startTime).format('MMM D, YYYY')}
          </Typography>
        </Box>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <AirIcon />
          <Typography>Speed: {day.values.windSpeed} m/s</Typography>
          <Typography>·</Typography>
          <Typography>Gust: {day.values.windGust} m/s</Typography>
          <Box sx={{ flex: 1 }} />
          <ArrowCircleUp
            sx={{ transform: `rotate(${day.values.windDirection}deg)` }}
          />
        </Box>
      </CardContent>
    </Card>
  );
};

export default DayCard;
