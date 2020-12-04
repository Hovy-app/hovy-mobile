import {useNavigation, CompositeNavigationProp} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';

export type LoginScreenNavigationProp = CompositeNavigationProp<
  StackNavigationProp<{Login: {}}, 'Login'>,
  StackNavigationProp<{ChooseEvents: {}}>
>;

export type UseLoginNavigationType = {
  navigation: LoginScreenNavigationProp;
};

export const useLoginNavigation = (): UseLoginNavigationType => ({
  navigation: useNavigation<LoginScreenNavigationProp>(),
});
