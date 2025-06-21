import React from 'react';
import { ListeningsContext } from "modules/listening/context/Listenings/Listenings.context";

const useListenings = () => {
  const context = React.useContext(ListeningsContext);
  if (!context) {
    throw new Error('useListenings must be used within a ListeningsProvider');
  }
  return context;
};

export default useListenings;