import connect from './connection.ts';

const { connection, channel } = await connect();

async function produce() {
  try {
    const queue = "hello";

    const message = { message: "Hello World!" };
    await channel.assertQueue(queue);
    const messages = new Array(100000).fill(message).map((message, index) => {
      return { ...message, index };
    })
    ;
    await Promise.all(
      messages.map((message) => {
        return channel.sendToQueue(
          queue, 
          Buffer.from(JSON.stringify(message)),
          { contentType: 'application/json' }
        );
      })
    );
    console.log(`\n\nSent [${messages.length}] messages to queue [${queue}]`);

  } catch (error) {
    console.log("error", error);
  } finally {
    await new Promise(resolve => setTimeout(resolve, 500));
    await connection.close();
    process.exit(0)
  }
}

produce().catch(console.error);