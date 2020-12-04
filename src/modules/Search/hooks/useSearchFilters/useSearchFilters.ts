import {useRoute, RouteProp} from '@react-navigation/native';

import {OrderFiltersType} from '../../../Orders/reducer';

export type UseSearchFiltersType = {
  filters?: OrderFiltersType;
};

export type SearchResultsScreenRouteProp = RouteProp<
  {SearchResults: {filters?: OrderFiltersType}},
  'SearchResults'
>;

export const useSearchFilters = (): UseSearchFiltersType => {
  const route = useRoute<SearchResultsScreenRouteProp>();

  return {
    filters: route.params?.filters,
  };
};
