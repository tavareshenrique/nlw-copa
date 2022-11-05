import { useState } from 'react';
import { Heading, useToast, VStack } from 'native-base';
import { useNavigation } from '@react-navigation/native';

import { api } from '../services/api';

import { Button, Header, Input } from '../components';

export function Find() {
  const [isLoading, setIsLoading] = useState(false);
  const [code, setCode] = useState('');

  const { navigate } = useNavigation();
  const toast = useToast();

  async function handleJoinPool() {
    try {
      setIsLoading(true);

      if (!code.trim()) {
        return toast.show({
          title: 'Digite o código do bolão.',
          placement: 'top',
          bgColor: 'red.500',
        });
      }

      await api.post('/pools/join', { code });

      toast.show({
        title: 'Você entrou no bolão com sucesso.',
        placement: 'top',
        bgColor: 'green.500',
      });

      navigate('pools');
    } catch (error) {
      console.log(error);

      setIsLoading(false);

      if (error.response.status === 404) {
        return toast.show({
          title: 'Não foi possível encontrar o bolão.',
          placement: 'top',
          bgColor: 'red.500',
        });
      }

      if (error.response.status === 409) {
        return toast.show({
          title: 'Você já está nesse bolão.',
          placement: 'top',
          bgColor: 'red.500',
        });
      }

      toast.show({
        title:
          'Houve algum problema ao tentar entrar no bolão, tente novamente mais tarde.',
        placement: 'top',
        bgColor: 'red.500',
      });
    }
  }

  return (
    <VStack flex={1} bgColor="gray.900">
      <Header title="Buscar por código" showBackButton />

      <VStack mt={8} mx={5} alignItems="center">
        <Heading
          fontFamily="heading"
          color="white"
          fontSize="xl"
          mb={8}
          textAlign="center"
        >
          Encontre um bolão através de {'\n'} seu código único.
        </Heading>

        <Input
          mb={2}
          placeholder="Qual o código do bolão?"
          autoCapitalize="characters"
          onChangeText={setCode}
          value={code}
        />

        <Button
          title="BUSCAR BOLÃO"
          onPress={handleJoinPool}
          isLoading={isLoading}
        />
      </VStack>
    </VStack>
  );
}
