import { useNavigation } from '@react-navigation/native';

import { VStack, Icon } from 'native-base';

import { Octicons } from '@expo/vector-icons';

import { Button, Header } from '../components';

export function Pools() {
  const { navigate } = useNavigation();

  return (
    <VStack flex={1} bgColor="gray.900">
      <Header title="Meus bolões" />

      <VStack
        mt={6}
        mx={5}
        pb={4}
        mb={4}
        borderBottomWidth={1}
        borderBottomColor="gray.600"
      >
        <Button
          onPress={() => navigate('find')}
          title="BUSCAR BOLÃO POR CÓDIGO"
          leftIcon={
            <Icon as={Octicons} name="search" color="black" size="md" />
          }
        />
      </VStack>
    </VStack>
  );
}
