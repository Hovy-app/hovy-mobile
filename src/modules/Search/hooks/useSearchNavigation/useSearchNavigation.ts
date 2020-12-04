import {useNavigation, CompositeNavigationProp} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';

import {OrderFiltersType} from '../../../Orders/reducer';

export type SearchScreenNavigationProp = CompositeNavigationProp<
  StackNavigationProp<{Search: {}}, 'Search'>,
  StackNavigationProp<{SearchResults: {filters: OrderFiltersType}}>
>;

export type UseSearchNavigationType = {
  navigation: SearchScreenNavigationProp;
};

export const useSearchNavigation = (): UseSearchNavigationType => ({
  navigation: useNavigation<SearchScreenNavigationProp>(),
});
