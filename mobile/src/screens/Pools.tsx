import { useCallback, useEffect, useState } from 'react';
import { useNavigation, useFocusEffect } from '@react-navigation/native';

import { VStack, Icon, useToast, FlatList } from 'native-base';

import { Octicons } from '@expo/vector-icons';

import { api } from '../services/api';

import {
  Button,
  Header,
  PoolCard,
  Loading,
  EmptyPoolList,
} from '../components';

import { IPoolCardProps } from '../components/PoolCard';

export function Pools() {
  const [pools, setPools] = useState<IPoolCardProps[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const { navigate } = useNavigation();
  const toast = useToast();

  const fetchPools = useCallback(async () => {
    try {
      setIsLoading(true);

      const response = await api.get('/pools');

      setPools(response.data.pools);
    } catch (error) {
      console.log(error);

      return toast.show({
        title: 'Não foi possível carregar os bolões.',
        placement: 'top',
        bgColor: 'red.500',
      });
    } finally {
      setIsLoading(false);
    }
  }, [toast]);

  useFocusEffect(
    useCallback(() => {
      fetchPools();
    }, [fetchPools])
  );

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

      {isLoading ? (
        <Loading />
      ) : (
        <FlatList
          data={pools}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <PoolCard
              data={item}
              onPress={() =>
                navigate('details', {
                  id: item.id,
                })
              }
            />
          )}
          ListEmptyComponent={() => <EmptyPoolList />}
          showsVerticalScrollIndicator={false}
          _contentContainerStyle={{
            pb: 10,
          }}
          px={5}
        />
      )}
    </VStack>
  );
}
