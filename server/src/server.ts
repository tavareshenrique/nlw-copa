import Fastify from 'fastify';

import cors from '@fastify/cors';
import jwt from '@fastify/jwt';

import { poolRoutes } from './routes/pool';
import { authRoutes } from './routes/auth';
import { gameRoutes } from './routes/game';
import { guessRoutes } from './routes/guess';
import { userRoutes } from './routes/user';

async function start() {
  const fastify = Fastify({ logger: true });

  await fastify.register(cors, {
    origin: true
  });

  await fastify.register(jwt, {
    secret: process.env.JWT_SECRET!
  });

  await fastify.register(poolRoutes);
  await fastify.register(authRoutes);
  await fastify.register(gameRoutes);
  await fastify.register(guessRoutes);
  await fastify.register(userRoutes);

  await fastify.listen({ port: 3333, host: '0.0.0.0' });
}

start()
  .then(() => console.log('🚀 Server started'))
  .catch(console.error);
