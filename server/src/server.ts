import Fastify from 'fastify';

async function start() {
  const fastify = Fastify({ logger: true });

  fastify.get('/pools/count', async (request, reply) => {
    return { count: 15 };
  });

  await fastify.listen({ port: 3333 });
}

start()
  .then(() => console.log('🚀 Server started'))
  .catch(console.error);
