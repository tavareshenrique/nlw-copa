import { useCallback, useEffect, useState } from 'react';
import { FlatList, useToast } from 'native-base';

import { api } from '../services/api';

import { Game, IGameProps } from './Game';
import { Loading } from './Loading';
import { EmptyMyPoolList } from './EmptyMyPoolList';

interface Props {
  poolId: string;
  code: string;
}

export function Guesses({ poolId, code }: Props) {
  const [isLoading, setIsLoading] = useState(true);
  const [games, setGames] = useState<IGameProps[]>([]);
  const [firstTeamScore, setFirstTeamScore] = useState('');
  const [secondTeamScore, setSecondTeamScore] = useState('');

  const toast = useToast();

  const fetchGames = useCallback(async () => {
    try {
      setIsLoading(true);

      const response = await api.get(`/pools/${poolId}/games`);

      setGames(response.data.games);
    } catch (error) {
      console.log(error);

      return toast.show({
        title: 'Não foi possível carregar os jogos.',
        placement: 'top',
        bgColor: 'red.500',
      });
    } finally {
      setIsLoading(false);
    }
  }, [poolId, toast]);

  async function handleGuessConfirm(gameId: string) {
    try {
      if (!firstTeamScore.trim() || !secondTeamScore.trim()) {
        return toast.show({
          title: 'Você precisa informar o placar de ambos os times.',
          placement: 'top',
          bgColor: 'red.500',
        });
      }

      await api.post(`/pools/${poolId}/games/${gameId}/guessess`, {
        firstTeamScore: Number(firstTeamScore),
        secondTeamScore: Number(secondTeamScore),
      });

      toast.show({
        title: 'Boa, craque! Boa Sorte! 🤞',
        placement: 'top',
        bgColor: 'green.500',
      });

      fetchGames();
    } catch (error) {
      console.log(error);

      return toast.show({
        title: 'Não foi possível enviar o palpite.',
        placement: 'top',
        bgColor: 'red.500',
      });
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    fetchGames();
  }, [fetchGames]);

  if (isLoading) {
    return <Loading />;
  }

  return (
    <FlatList
      data={games}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => (
        <Game
          data={item}
          setFirstTeamPoints={setFirstTeamScore}
          setSecondTeamPoints={setSecondTeamScore}
          onGuessConfirm={() => handleGuessConfirm(item.id)}
        />
      )}
      _contentContainerStyle={{
        pb: 10,
      }}
      ListEmptyComponent={() => <EmptyMyPoolList code={code} />}
    />
  );
}
