import React from 'react';

import SafeContainer from '../../../components/ui/SafeContainer';
import PageContainer from '../../../components/common/PageContainer';
import ChooseEventsContainer from '../components/ChooseEventsContainer';
import ChooseEventsTitleBlock from '../components/ChooseEventsTitleBlock';
import ChooseEventsForm from '../components/ChooseEventsForm';

const ChooseEventsScreen: React.FC = () => {
  return (
    <SafeContainer isFlex>
      <PageContainer>
        <ChooseEventsContainer>
          <ChooseEventsTitleBlock />
          <ChooseEventsForm />
        </ChooseEventsContainer>
      </PageContainer>
    </SafeContainer>
  );
};

export default ChooseEventsScreen;
