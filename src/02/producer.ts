import connect from './connection.ts';

const { connection, channel } = await connect();

async function produce() {
  try {
    const queue = "hello";

    const message = { message: "Hello World!" };

    await channel.assertQueue(queue);
    channel.sendToQueue(
      queue, 
      Buffer.from(JSON.stringify(message)),
      { contentType: 'application/json' }
    );

    console.log(`\n\nMessage sent to queue [${queue}]: [${JSON.stringify(message)}]`);
  } catch (error) {
    console.log("error", error);
  } finally {
    await new Promise(resolve => setTimeout(resolve, 500));
    await connection.close();
    process.exit(0)
  }
}

produce().catch(console.error);