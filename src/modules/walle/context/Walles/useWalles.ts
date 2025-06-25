import React from 'react';

import { WallesContext } from './Walles.context';

const useWalles = () => {
  const context = React.useContext(WallesContext);
  if (!context) {
    throw new Error('useWalles must be used within a WallesProvider');
  }
  return context;
};

export default useWalles;