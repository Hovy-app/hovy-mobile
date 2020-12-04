import {useCallback, useContext} from 'react';
import {NativeScrollEvent, NativeSyntheticEvent} from 'react-native';
import {ScrollEvent} from 'recyclerlistview/dist/reactnative/core/scrollcomponent/BaseScrollView';

import {ScrollContext, ScrollContextType} from '../../context';

export type UseScrollerType = Partial<ScrollContextType> & {
  handleScroll: (
    e: NativeSyntheticEvent<NativeScrollEvent> | ScrollEvent
  ) => void;
};

export const useScroller = (): UseScrollerType => {
  const {updateOffset, ...restProps} = useContext(ScrollContext);

  const handleScroll = useCallback(
    ({
      nativeEvent,
    }: NativeSyntheticEvent<NativeScrollEvent> | ScrollEvent): void => {
      if (updateOffset) updateOffset(nativeEvent.contentOffset.y);
    },
    [updateOffset]
  );

  return {
    updateOffset,
    ...restProps,
    handleScroll,
  };
};
