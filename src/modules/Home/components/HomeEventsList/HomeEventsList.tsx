import React from 'react';
import {View, StyleSheet} from 'react-native';

import {useTheme} from '../../../../modules/Theme/hooks/useTheme';
import {useEvents} from '../../../../modules/Events/hooks/useEvents';
import {useHomeNavigation} from '../../hooks/useHomeNavigation';

import Text from '../../../../components/ui/Text';
import Button from '../../../../components/ui/Button';
import EventItem from '../../../../components/ui/EventItem';

const HomeEventsList: React.FC = () => {
  const {theme} = useTheme();
  const {selectedEvents} = useEvents();
  const {navigation} = useHomeNavigation();

  const openChooseEventsScreen = (): void => {
    navigation.navigate('ChooseEvents', {
      displayBackButton: true,
    });
  };

  return (
    <View>
      <View
        style={[
          styles.titleContainer,
          {marginRight: -theme.layout.sm, marginBottom: theme.layout.md},
        ]}>
        <Text type="subtitle">Выбрано:</Text>
        <Button
          type="clear"
          title="Изменить"
          iconRight="settings"
          onPress={openChooseEventsScreen}
        />
      </View>
      <View
        style={{
          marginHorizontal: -theme.layout.md,
          marginBottom: theme.layout.md,
        }}>
        {selectedEvents?.map(({id, name}, i, arr) => (
          <EventItem
            key={id}
            title={name}
            isHighlighted
            style={i !== arr.length - 1 && {marginBottom: theme.layout.md}}
          />
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
});

export default HomeEventsList;
