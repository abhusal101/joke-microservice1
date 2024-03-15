const amqp = require('amqplib');

const RMQ_HOST = 'localhost';
const RMQ_PORT = 5672;
const QUEUE_NAME = 'jokesQueue';

async function produceJokes() {
  try {
    const connection = await amqp.connect(`amqp://${RMQ_HOST}:${RMQ_PORT}`);
    const channel = await connection.createChannel();
    await channel.assertQueue(QUEUE_NAME, { durable: true });

    // // Example joke message
    // const joke = {
    //   type: 'programming',
    //   setup: 'I know I did okay on today programming test...',
    //   punchline: 'Well.......because my teacher gave me C++'
    // };

    // Send joke message to the queue
    //channel.sendToQueue(QUEUE_NAME, Buffer.from(JSON.stringify(joke)), { persistent: true });

    //console.log('Joke sent to RabbitMQ');


    // Generate multiple joke messages
    const jokes = [
      {
        type: 'kids',
        setup: 'Why can\'t Elsa from Frozen have a balloon?',
        punchline: 'Because she will "let it go, let it go."'
      },
      {
        type: 'science',
        setup: 'What did one light bulb say to the other?',
        punchline: 'Watt\'s up?'
      }
      // Add more jokes here as needed
    ];

    for (const joke of jokes) {
        // Send joke message to the queue
        channel.sendToQueue(QUEUE_NAME, Buffer.from(JSON.stringify(joke)), { persistent: true });
        console.log(`Joke sent to RabbitMQ: ${joke.setup}`);
    }
    
    // Close the channel and connection
    await channel.close();
    await connection.close();
  } catch (error) {
    console.error('Error producing joke:', error);
  }
}


module.exports = { produceJokes };
