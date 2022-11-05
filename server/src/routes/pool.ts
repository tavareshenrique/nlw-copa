import { FastifyInstance } from 'fastify';

import ShortUniqueId from 'short-unique-id';
import { z } from 'zod';

import { authenticate } from '../plugins/authenticate';

import { prisma } from '../lib/prisma';

export async function poolRoutes(fastify: FastifyInstance) {
  fastify.get('/pools/count', async () => {
    const count = await prisma.pool.count();

    return { count };
  });

  fastify.get(
    '/pools',
    {
      onRequest: [authenticate]
    },
    async (request) => {
      const pools = await prisma.pool.findMany({
        where: {
          participants: {
            some: {
              userId: request.user.sub
            }
          }
        },
        include: {
          _count: {
            select: {
              participants: true
            }
          },

          participants: {
            select: {
              id: true,

              user: {
                select: {
                  avatarUrl: true
                }
              }
            },
            take: 4
          },

          owner: {
            select: {
              id: true,
              name: true
            }
          }
        }
      });

      return { pools };
    }
  );

  fastify.post('/pools', async (request, reply) => {
    const createPoolBody = z.object({
      title: z.string()
    });

    const { title } = createPoolBody.parse(request.body);

    const generate = new ShortUniqueId({
      length: 6
    });

    const code = String(generate()).toUpperCase();

    try {
      await request.jwtVerify();

      await prisma.pool.create({
        data: {
          title,
          code,
          ownerId: request.user.sub,

          participants: {
            create: {
              userId: request.user.sub
            }
          }
        }
      });
    } catch (error) {
      await prisma.pool.create({
        data: {
          title,
          code
        }
      });
    }

    return await reply.status(201).send({ title, code });
  });

  fastify.post(
    '/pools/:id/join',
    {
      onRequest: [authenticate]
    },
    async (request, reply) => {
      const joinPoolBody = z.object({
        code: z.string()
      });

      const { code } = joinPoolBody.parse(request.body);

      const pool = await prisma.pool.findUnique({
        where: {
          code
        },
        include: {
          participants: {
            where: {
              userId: request.user.sub
            }
          }
        }
      });

      if (!pool) {
        return await reply.status(404).send({ message: 'Pool not found.' });
      }

      if (pool.participants.length > 0) {
        return await reply.status(409).send({ message: 'Already joined.' });
      }

      if (!pool.ownerId) {
        await prisma.pool.update({
          where: {
            id: pool.id
          },
          data: {
            ownerId: request.user.sub
          }
        });
      }

      await prisma.participant.create({
        data: {
          poolId: pool.id,
          userId: request.user.sub
        }
      });

      return await reply.status(201).send();
    }
  );
}
