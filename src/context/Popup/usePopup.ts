import React from "react";

import { ContextPopup, ContextValuePopup } from "context/Popup/Popup.context";

const usePopup = (): ContextValuePopup => {
  const context = React.useContext(ContextPopup);

  if (!context) {
    throw new Error('usePopup must be used within an PopupProvider');
  }

  return context;
};

export default usePopup;

// const popup = usePopup();
//  popup.notice({
//   message: 'something text',
//   severity: 'info'
// });

// @message
// @severity(optional) default id success