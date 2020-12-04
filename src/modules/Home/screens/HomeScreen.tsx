import React from 'react';

import SafeScrollerContainer from '../../../components/common/SafeScrollerContainer';
import PageContainer from '../../../components/common/PageContainer';
import HomeCard from '../components/HomeCard';
import HomeEventsList from '../components/HomeEventsList';

const HomeScreen: React.FC = () => {
  return (
    <SafeScrollerContainer isFlex>
      <PageContainer>
        <HomeCard />
        <HomeEventsList />
      </PageContainer>
    </SafeScrollerContainer>
  );
};

export default HomeScreen;
