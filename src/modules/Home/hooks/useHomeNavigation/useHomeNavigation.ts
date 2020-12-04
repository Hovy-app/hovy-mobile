import {useNavigation, CompositeNavigationProp} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';

export type HomeScreenNavigationProp = CompositeNavigationProp<
  StackNavigationProp<{Home: {}}, 'Home'>,
  StackNavigationProp<{
    ChooseEvents: {displayBackButton?: boolean};
    Scanner: {};
  }>
>;

export type UseHomeNavigationType = {
  navigation: HomeScreenNavigationProp;
};

export const useHomeNavigation = (): UseHomeNavigationType => ({
  navigation: useNavigation<HomeScreenNavigationProp>(),
});
