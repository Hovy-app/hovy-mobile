import React, {useState, useCallback} from 'react';

export interface ScrollContextType {
  opacity: number;
  maxOffset: number;
  offset: number;
  updateOffset(val: number): void;
}

export const ScrollContext = React.createContext<Partial<ScrollContextType>>({
  opacity: 0,
  maxOffset: 0,
  offset: 0,
  updateOffset: () => {
    /* FUNC */
  },
});

const ScrollContextProvider: React.FC = ({children}) => {
  const minOffset = 0;
  const maxOffset = 30;

  const [offset, setOffset] = useState<number>(0);
  const [opacity, setOpacity] = useState<number>(0);

  const withinLimits = (val: number, min: number, max: number): number =>
    val > max ? max : val < min ? min : val;

  const updateOffset = useCallback((val: number): void => {
    setOffset(withinLimits(val, minOffset, maxOffset));
    setOpacity(withinLimits((val * maxOffset) / 1000, 0, 0.1));
  }, []);

  return (
    <ScrollContext.Provider
      value={{
        opacity: opacity,
        maxOffset: maxOffset,
        offset: offset,
        updateOffset: updateOffset,
      }}>
      {children}
    </ScrollContext.Provider>
  );
};

export default ScrollContextProvider;
