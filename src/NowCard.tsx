import React from 'react';
import {
  CardContent,
  Card,
  Typography,
  Box,
} from '@mui/material';
import { Interval } from './model/weather';
import AirIcon from '@mui/icons-material/Air';

import ConditionBadge from './ConditionBadge';

interface NowCardProps {
  day: Interval;
}

const NowCard: React.FC<NowCardProps> = ({ day }) => {
  return (
    <Card
      sx={{
        backgroundImage: 'none',
        width: '100%',
      }}
    >
      <CardContent>
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 1,
          }}
        >
          <ConditionBadge interval={day} size="64px" />
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <AirIcon />
            <Typography>Speed: {day.values.windSpeed} m/s</Typography>
            <Typography>·</Typography>
            <Typography>Gust: {day.values.windGust} m/s</Typography>
          </Box>
        </Box>
      </CardContent>
    </Card>
  );
};

export default NowCard;
