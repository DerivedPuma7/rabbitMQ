import connect from './connection.ts';

const { connection, channel } = await connect();

async function produce() {
  try {
    const queue = "hello";

    const message = { message: "Hello World!" };

    await channel.assertQueue(queue); // cria a fila se ainda não existir
    channel.sendToQueue(queue, Buffer.from(JSON.stringify(message)));

    console.log(`Message sent to queue [${queue}]: [${message}]`);
  } catch (error) {
    console.log("error", error);
  } finally {
    await new Promise(resolve => setTimeout(resolve, 500));
    await connection.close();
    process.exit(0)
  }
}

produce().catch(console.error);