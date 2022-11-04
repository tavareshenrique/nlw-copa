import { Heading, Text, VStack } from 'native-base';

import { Button, Header, Input } from '../components';

import Logo from '../assets/logo.svg';

export function New() {
  return (
    <VStack flex={1} bgColor="gray.900">
      <Header title="Criar novo bolão" />

      <VStack mt={8} mx={5} alignItems="center">
        <Logo />

        <Heading
          fontFamily="heading"
          color="white"
          fontSize="xl"
          my={8}
          textAlign="center"
        >
          Crei seu próprio bolão da copa {'\n'} e compartilhe entre amigos!
        </Heading>

        <Input mb={2} placeholder="Qual o nome do seu bolão?" />

        <Button title="CRIAR MEU BOLÃO" />

        <Text color="gray.300" fontSize="sm" textAlign="center" px={10} mt={4}>
          Após criar seu bolão, você receberá um código único que poderá usar
          para convidar outras pessoas
        </Text>
      </VStack>
    </VStack>
  );
}
