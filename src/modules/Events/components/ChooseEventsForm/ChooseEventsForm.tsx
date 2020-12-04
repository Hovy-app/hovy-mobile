import React from 'react';
import {View, ScrollView, StyleSheet, ScrollViewProps} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

import {useTheme} from '../../../../modules/Theme/hooks/useTheme';
import {useEventsList} from '../../hooks/useEventsList';

import EventItem from '../../../../components/ui/EventItem';
import ErrorCard from '../../../../components/common/ErrorCard';
import LoadingCard from '../../../../components/common/LoadingCard';
import ChooseEventsBottomBlock from '../ChooseEventsBottomBlock';

export type ChooseEventsFormProps = ScrollViewProps;

const ChooseEventsForm: React.FC<ChooseEventsFormProps> = ({
  style,
  contentContainerStyle,
  ...restProps
}) => {
  const {theme} = useTheme();
  const {
    submitSelectedEvents,
    eventsData,
    localSelectedEventIds,
    toggleSelectEvent,
    isError,
    isNoData,
    isLoading,
    displayBackButton,
  } = useEventsList();

  const renderEventsList = (): JSX.Element => {
    if (!eventsData?.length && (isError || isNoData))
      return <ErrorCard type={isNoData ? 'no-data' : 'default'} />;

    if (eventsData?.length)
      return (
        <>
          {eventsData.map((el, i, arr) => (
            <EventItem
              key={el.id}
              title={el.name}
              style={i !== arr.length - 1 && {marginBottom: theme.layout.md}}
              onPress={toggleSelectEvent.bind(null, el.id)}
              isActive={el.isSelected}
            />
          ))}
        </>
      );

    return <LoadingCard />;
  };

  return (
    <>
      <View style={[styles.container, {marginHorizontal: -theme.layout.md}]}>
        <ScrollView
          style={[styles.scrollContainer, style]}
          contentContainerStyle={[
            {paddingVertical: theme.layout.md},
            (isError || isNoData) && styles.centeredContent,
            contentContainerStyle,
          ]}
          {...restProps}>
          {renderEventsList()}
        </ScrollView>
        <LinearGradient
          colors={[theme.colors.bg, theme.colors.bgTransparent]}
          locations={[0, 1]}
          style={[styles.linearTop, {height: theme.layout.md}]}
        />
        <LinearGradient
          colors={[theme.colors.bgTransparent, theme.colors.bg]}
          locations={[0, 1]}
          style={[styles.linearBottom, {height: theme.layout.md}]}
        />
      </View>
      <ChooseEventsBottomBlock
        disabled={!localSelectedEventIds.size}
        isLoading={isLoading}
        selectedItemsSize={localSelectedEventIds.size}
        onSubmit={submitSelectedEvents}
        displayBackButton={displayBackButton}
      />
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  linearTop: {
    width: '100%',
    position: 'absolute',
    top: 0,
  },
  linearBottom: {
    width: '100%',
    position: 'absolute',
    bottom: 0,
  },
  scrollContainer: {
    flex: 1,
  },
  centeredContent: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default ChooseEventsForm;
