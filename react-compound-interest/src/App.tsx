import React, { FC } from 'react';

import GlobalStyles from './styles/global';

import Dashboard from './pages/Dashboard';

const App: FC = () => (
  <>
    <Dashboard />
    <GlobalStyles />
  </>
);

export default App;
