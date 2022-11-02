import { NativeBaseProvider, StatusBar } from 'native-base';

import { Main } from './src';

import { THEME } from './src/styles/theme';

export default function App() {
  return (
    <NativeBaseProvider theme={THEME}>
      <StatusBar barStyle="light-content" backgroundColor="transparent" translucent />

      <Main />
    </NativeBaseProvider>
  );
}
