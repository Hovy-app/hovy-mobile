import React from 'react';

import KeyboardAvoidingContainer from '../../../components/ui/KeyboardAvoidingContainer';
import SafeScrollerContainer from '../../../components/common/SafeScrollerContainer';
import PageContainer from '../../../components/common/PageContainer';
import SearchForm from '../components/SearchForm';

const SearchScreen: React.FC = () => {
  return (
    <KeyboardAvoidingContainer>
      <SafeScrollerContainer isFlex isCentered>
        <PageContainer isCentered>
          <SearchForm />
        </PageContainer>
      </SafeScrollerContainer>
    </KeyboardAvoidingContainer>
  );
};

export default SearchScreen;
