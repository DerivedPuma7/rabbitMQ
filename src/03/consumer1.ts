import amqplib from 'amqplib';
type ConsumeMessage = amqplib.ConsumeMessage;

import connect from './connection.ts';

const { connection, channel } = await connect();

async function consume() {
  const queue = "fila1";

  await channel.assertQueue(queue);
  console.log(`\n\nWaiting for messages in queue [${queue}]...`);

  channel.consume(queue, read, { noAck: false });
}

function read(message: ConsumeMessage | null) {
  if(message) {
    const content = message.content.toString();
    console.log(`\nReceived message: ${content}`);
    console.log(`Message properties: ${JSON.stringify(message.properties)}`);
    channel.ack(message);
  }
}

consume().catch(console.error);
