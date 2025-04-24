import * as amqplib from 'amqplib';

export default async function connect(): Promise<{ connection: amqplib.ChannelModel; channel: amqplib.Channel }> {
  try {
    const connection = await amqplib.connect('amqp://rabbitmq:rabbitmq@localhost:5672');
    const channel = await connection.createChannel();

    return { connection, channel };
  } catch (error) {
    console.log("error", error);
    throw error;
  }
}