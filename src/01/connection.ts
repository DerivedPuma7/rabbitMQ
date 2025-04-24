import * as amqplib from 'amqplib';

const sleep = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

async function connect() {
  try {
    const connection = await amqplib.connect('amqp://rabbitmq:rabbitmq@localhost:5672');
    console.log("\nConnected to RabbitMQ");
    const channel = await connection.createChannel();
    console.log("Channel created");

    await sleep(3000);

    await channel.close();
    console.log("Channel closed");
    await connection.close();
    console.log("Connection closed");
  } catch (error) {
    console.log("error", error);
  }
}

connect();