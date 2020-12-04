import React from 'react';

import {useSearchFilters} from '../../hooks/useSearchFilters';

import OrdersList from '../../../Orders/components/OrdersList';

const SearchList: React.FC = () => {
  const {filters} = useSearchFilters();

  return <OrdersList filters={filters} />;
};

export default SearchList;
