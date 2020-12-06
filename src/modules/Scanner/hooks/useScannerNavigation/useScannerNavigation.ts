import {useNavigation, CompositeNavigationProp} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';

export type ScannerScreenNavigationProp = CompositeNavigationProp<
  StackNavigationProp<{Scanner: {}}, 'Scanner'>,
  StackNavigationProp<{Auth: undefined}>
>;

export type UseScannerNavigationType = {
  navigation: ScannerScreenNavigationProp;
};

export const useScannerNavigation = (): UseScannerNavigationType => ({
  navigation: useNavigation<ScannerScreenNavigationProp>(),
});
