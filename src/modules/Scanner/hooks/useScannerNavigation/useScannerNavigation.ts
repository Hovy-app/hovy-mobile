import {useNavigation, CompositeNavigationProp} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';

import {OrderFiltersType} from '../../../Orders/reducer';

export type ScannerScreenNavigationProp = CompositeNavigationProp<
  StackNavigationProp<{Scanner: {}}, 'Scanner'>,
  StackNavigationProp<{SearchResults: {filters: OrderFiltersType}}>
>;

export type UseScannerNavigationType = {
  navigation: ScannerScreenNavigationProp;
};

export const useScannerNavigation = (): UseScannerNavigationType => ({
  navigation: useNavigation<ScannerScreenNavigationProp>(),
});
