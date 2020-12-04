import React from 'react';

import {useScroller} from '../../../modules/Scroller/hooks/useScroller';

import SafeScrollContainer, {
  SafeScrollContainerProps,
} from '../../ui/SafeScrollContainer';

export type SafeScrollerContainerProps = SafeScrollContainerProps;

const SafeScrollerContainer: React.FC<SafeScrollerContainerProps> = ({
  children,
  ...restProps
}) => {
  const {handleScroll} = useScroller();

  return (
    <SafeScrollContainer
      onScroll={handleScroll}
      scrollEventThrottle={50}
      {...restProps}>
      {children}
    </SafeScrollContainer>
  );
};

export default SafeScrollerContainer;
