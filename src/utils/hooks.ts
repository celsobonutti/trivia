import React from 'react';

export const useForceUpdate = () => {
  const [, setNewState] = React.useState(false);
  return () => setNewState((curr) => !curr);
};
