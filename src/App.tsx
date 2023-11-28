import React from 'react';

import Dashboard from './Dashboard';
import Configuration from './Configuration';
import { Box } from '@mui/material';

const App: React.FC = () => {
  return (
    <Box
      sx={{
        p: 0,
        m: 0,
        display: 'flex',
        flexDirection: 'row',
      }}
    >
      <Dashboard />
      <Box
        sx={{
          borderLeft: '1px solid',
          borderColor: 'divider',
        }}
      />
      <Configuration />
    </Box>
  );
};

export default App;
