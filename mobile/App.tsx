import { StatusBar } from 'expo-status-bar';

import { NativeBaseProvider, Text, Center } from 'native-base';

import { THEME } from './src/styles/theme'

export default function App() {
  return (
    <NativeBaseProvider theme={THEME} >
      <Center flex={1} bgColor="green.500">
        <Text color="white" fontSize={24}>Pitica ♥️</Text>
        <StatusBar style="auto" />
      </Center>
    </NativeBaseProvider>
  );
}