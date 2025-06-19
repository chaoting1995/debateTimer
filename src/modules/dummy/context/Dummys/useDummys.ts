import React from 'react';

import { DummysContext } from "./Dummys.context";

const useDummys = () => {
  const context = React.useContext(DummysContext);
  if (!context) {
    throw new Error('useDummys must be used within a DummysProvider');
  }
  return context;
};

export default useDummys;