import React, {useEffect} from 'react';

import {useAppInitialize} from '../hooks/useAppInitialize';

const LoadingScreen: React.FC = () => {
  const {initialize} = useAppInitialize();

  useEffect(() => {
    initialize();
  }, [initialize]);

  return null;
};

export default LoadingScreen;
