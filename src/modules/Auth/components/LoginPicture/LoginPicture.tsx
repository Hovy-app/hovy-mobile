import React, {useState} from 'react';
import {Animated, StyleSheet} from 'react-native';

import LogoSvg from '../../../../assets/images/Logo.svg';

const IMAGE_SIZE = 200;

const LoginPicture: React.FC = () => {
  const [animatedImageHeight] = useState(new Animated.Value(IMAGE_SIZE));

  // useEffect(() => {
  //   const keyboardWillShow = (event): void => {
  //     Animated.timing(animatedImageHeight, {
  //       useNativeDriver: false,
  //       duration: event.duration,
  //       toValue: 0,
  //     }).start();
  //   };

  //   const keyboardWillHide = (event): void => {
  //     Animated.timing(animatedImageHeight, {
  //       useNativeDriver: false,
  //       duration: event.duration,
  //       toValue: IMAGE_SIZE,
  //     }).start();
  //   };

  //   const keyboardWillShowSubscriber = Keyboard.addListener(
  //     Platform.OS !== 'ios' ? 'keyboardDidShow' : 'keyboardWillShow',
  //     keyboardWillShow
  //   );
  //   const keyboardWillHideSubscriber = Keyboard.addListener(
  //     Platform.OS !== 'ios' ? 'keyboardDidHide' : 'keyboardWillHide',
  //     keyboardWillHide
  //   );

  //   return () => {
  //     keyboardWillShowSubscriber.remove();
  //     keyboardWillHideSubscriber.remove();
  //   };
  // }, [animatedImageHeight]);

  return (
    <Animated.View
      style={[styles.pictureContainer, {height: animatedImageHeight}]}>
      <LogoSvg height="100%" width={IMAGE_SIZE} style={styles.picture} />
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  pictureContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  picture: {},
});

export default LoginPicture;
