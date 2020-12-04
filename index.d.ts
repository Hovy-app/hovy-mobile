declare module '*.svg' {
  // eslint-disable-next-line import/newline-after-import
  import {SvgProps} from 'react-native-svg';
  const content: React.FC<SvgProps>;
  export default content;
}
