import React from 'react';

import Dashboard from './Dashboard';
import Configuration from './Configuration';

import styles from './App.module.css';

const App: React.FC = () => {
  return (
    <div className={styles.App}>
      <Dashboard />
      <Configuration />
    </div>
  );
};

export default App;
