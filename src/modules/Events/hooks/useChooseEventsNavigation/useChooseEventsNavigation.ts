import {
  useNavigation,
  CompositeNavigationProp,
  useRoute,
  RouteProp,
} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';

export type ChooseEventsScreenNavigationProp = CompositeNavigationProp<
  StackNavigationProp<
    {ChooseEvents: {displayBackButton?: boolean}},
    'ChooseEvents'
  >,
  StackNavigationProp<{MainTabs: {}}>
>;

export type ChooseScreenRouteProp = RouteProp<
  {ChooseEvents: {displayBackButton?: boolean}},
  'ChooseEvents'
>;

export type ChooseEventsNavigationType = {
  navigation: ChooseEventsScreenNavigationProp;
  route: ChooseScreenRouteProp;
};

export const useChooseEventsNavigation = (): ChooseEventsNavigationType => ({
  navigation: useNavigation<ChooseEventsScreenNavigationProp>(),
  route: useRoute<ChooseScreenRouteProp>(),
});
