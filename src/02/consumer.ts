import amqplib from 'amqplib';
type ConsumeMessage = amqplib.ConsumeMessage;

import connect from './connection.ts';

const { connection, channel } = await connect();

async function consume() {
  const queue = "hello";

  await channel.assertQueue(queue);
  console.log(`Waiting for messages in queue [${queue}]...`);

  channel.consume(queue, read, { noAck: true });
}

function read(message: ConsumeMessage | null) {
  if(message) {
    const content = message.content.toString();
    console.log(`Received message: ${content}`);
    // channel.ack(message);
  }
}

consume().catch(console.error);
