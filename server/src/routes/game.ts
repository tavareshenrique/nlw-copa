import { FastifyInstance } from 'fastify';

import { z } from 'zod';

import { authenticate } from '../plugins/authenticate';

import { prisma } from '../lib/prisma';

export async function gameRoutes(fastify: FastifyInstance) {
  fastify.get(
    '/pools/:id/games',
    {
      onRequest: [authenticate]
    },
    async (request) => {
      const getPoolParams = z.object({
        id: z.string()
      });

      const { id } = getPoolParams.parse(request.params);

      const games = await prisma.game.findMany({
        orderBy: {
          date: 'desc'
        },
        include: {
          guesses: {
            where: {
              participant: {
                userId: request.user.sub,
                poolId: id
              }
            }
          }
        }
      });

      return {
        games: games.map((game) => {
          return {
            ...game,
            guess: game.guesses.length > 0 ? game.guesses[0] : null,
            guesses: undefined
          };
        })
      };
    }
  );

  fastify.post(
    '/pools/:poolId/games/:gameId/guessess',
    {
      onRequest: [authenticate]
    },
    async (request, reply) => {
      const createGuessParams = z.object({
        poolId: z.string(),
        gameId: z.string()
      });

      const createGuessBody = z.object({
        firstTeamScore: z.number(),
        secondTeamScore: z.number()
      });

      const { poolId, gameId } = createGuessParams.parse(request.params);

      const { firstTeamScore, secondTeamScore } = createGuessBody.parse(
        request.body
      );

      const participant = await prisma.participant.findUnique({
        where: {
          userId_poolId: {
            poolId,
            userId: request.user.sub
          }
        }
      });

      if (!participant) {
        return await reply.status(403).send({
          message: "You're not allowed to create a guess inside this pool."
        });
      }

      const guess = await prisma.guess.findUnique({
        where: {
          participantId_gameId: {
            participantId: participant.id,
            gameId
          }
        }
      });

      if (guess) {
        return await reply.status(409).send({
          message: "You're already sent a guess to this game on this pool."
        });
      }

      const game = await prisma.game.findUnique({
        where: {
          id: gameId
        }
      });

      if (!game) {
        return await reply.status(404).send({
          message: 'Game not found.'
        });
      }

      if (game.date < new Date()) {
        return await reply.status(409).send({
          message: 'This game already happened.'
        });
      }

      await prisma.guess.create({
        data: {
          gameId,
          participantId: participant.id,
          firstTeamScore,
          secondTeamScore
        }
      });

      return await reply.status(201).send();
    }
  );
}
