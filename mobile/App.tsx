import { NativeBaseProvider, StatusBar } from 'native-base';

import { Main } from './src';
import { AuthContextProvider } from './src/context/AuthContext';

import { THEME } from './src/styles/theme';

export default function App() {
  return (
    <NativeBaseProvider theme={THEME}>
      <AuthContextProvider>
        <StatusBar
          barStyle="light-content"
          backgroundColor="transparent"
          translucent
        />

        <Main />
      </AuthContextProvider>
    </NativeBaseProvider>
  );
}
