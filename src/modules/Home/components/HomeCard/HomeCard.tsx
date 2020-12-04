import React from 'react';

import {useTheme} from '../../../../modules/Theme/hooks/useTheme';
import {useHomeNavigation} from '../../hooks/useHomeNavigation';

import InteractiveCard, {
  InteractiveCardProps,
} from '../../../../components/ui/InteractiveCard';

export type HomeCardProps = InteractiveCardProps;

const HomeCard: React.FC<HomeCardProps> = () => {
  const {theme} = useTheme();
  const {navigation} = useHomeNavigation();

  const openScannerScreen = (): void => {
    navigation.navigate('Scanner', {});
  };

  return (
    <InteractiveCard
      style={{marginBottom: theme.layout.lg, marginTop: theme.layout.md}}
      title="Приветствуем!"
      subtitle="Для начала работы просканируйте QR-код."
      buttonProps={{
        title: 'Сканировать',
        iconRight: 'maximize',
        onPress: openScannerScreen,
      }}
    />
  );
};

export default HomeCard;
