import { useEffect, useState } from 'react';
import { Share } from 'react-native';

import { HStack, useToast, VStack } from 'native-base';

import { useRoute } from '@react-navigation/native';

import { api } from '../services/api';

import {
  Header,
  Loading,
  PoolHeader,
  EmptyMyPoolList,
  Option,
  Guesses,
} from '../components';
import { IPoolCardProps } from '../components/PoolCard';

interface IRoutesParams {
  id: string;
}

type TOptions = 'guesses' | 'ranking';

export function Details() {
  const [isLoading, setIsLoading] = useState(true);
  const [poolDetails, setPoolDetails] = useState<IPoolCardProps>(
    {} as IPoolCardProps
  );
  const [optionSelected, setOptionSelected] = useState<TOptions>('guesses');

  const route = useRoute();
  const toast = useToast();

  const { id } = route.params as IRoutesParams;

  useEffect(() => {
    async function fetchPoolDetails() {
      try {
        setIsLoading(true);

        const response = await api.get(`/pools/${id}`);

        setPoolDetails(response.data.pool);
      } catch (error) {
        console.log(error);

        return toast.show({
          title: 'Não foi possível carregar os detalhes do bolão.',
          placement: 'top',
          bgColor: 'red.500',
        });
      } finally {
        setIsLoading(false);
      }
    }

    fetchPoolDetails();
  }, [id, toast]);

  async function handleCodeShare() {
    Share.share({
      message: `Código para acessar o meu bolão: ${poolDetails.code}`,
    });
  }

  if (isLoading) {
    return <Loading />;
  }

  return (
    <VStack flex={1} bgColor="gray.900">
      <Header
        title={poolDetails.title}
        onShare={handleCodeShare}
        showShareButton
        showBackButton
      />

      {poolDetails._count?.participants > 0 ? (
        <VStack px={5} flex={1}>
          <PoolHeader data={poolDetails} />

          <HStack bgColor="gray.800" p={1} rounded="sm" mb={5}>
            <Option
              title="Seus palpites"
              onPress={() => setOptionSelected('guesses')}
              isSelected={optionSelected === 'guesses'}
            />
            <Option
              title="Ranking do grupo"
              onPress={() => setOptionSelected('ranking')}
              isSelected={optionSelected === 'ranking'}
            />
          </HStack>

          <Guesses poolId={poolDetails.id} code={poolDetails.code} />
        </VStack>
      ) : (
        <EmptyMyPoolList code={poolDetails.code} />
      )}
    </VStack>
  );
}
