import connect from './connection.ts';

const { connection, channel } = await connect();

async function produce() {
  try {
    const exchange = 'amq.fanout';
    const queues = ['fila1', 'fila2', 'fila3'];
    const routingKey = '';

    queues.forEach(async (queue) => {
      await channel.assertQueue(queue);
    });

    const message = { message: 'Hello World!' };
    const messages = new Array(1000).fill(message).map((message, index) => {
      return { ...message, index };
    })
    ;
    await Promise.all(
      messages.map((message) => {
        return channel.publish(
          exchange,
          routingKey, 
          Buffer.from(JSON.stringify(message)),
          { contentType: 'application/json' }
        );
      })
    );
    console.log(`\n\nSent [${messages.length}] messages to exchange [${exchange}]`);

  } catch (error) {
    console.log('error', error);
  } finally {
    await new Promise(resolve => setTimeout(resolve, 500));
    await connection.close();
    process.exit(0)
  }
}

produce().catch(console.error);