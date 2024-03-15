const amqp = require('amqplib');
const mysql = require('mysql2/promise');

const RMQ_HOST = 'localhost';
const RMQ_PORT = 5672;
const QUEUE_NAME = 'jokesQueue';
const DB_HOST = 'localhost';
const DB_USER = 'root';
const DB_PASSWORD = '';
const DB_NAME = 'jokesdb';

async function startConsuming() {
    try {
      const connection = await amqp.connect(`amqp://${RMQ_HOST}:${RMQ_PORT}`);
      const channel = await connection.createChannel();
      await channel.assertQueue(QUEUE_NAME, { durable: true });
  
      channel.consume(QUEUE_NAME, async (message) => {
        try {
          const joke = JSON.parse(message.content.toString());
          
          // Transform the joke data as required
          const transformedJoke = transformJoke(joke);
  
          // Load the transformed joke into the database
          await insertJokeIntoDatabase(transformedJoke);
  
          // Acknowledge the message
          channel.ack(message);
        } catch (error) {
          console.error('Error processing message:', error);
          // Reject the message (optional), so it can be requeued or handled accordingly
          channel.reject(message, false);
        }
      });
    } catch (error) {
      console.error('Error consuming messages:', error);
    }
}

async function insertJokeIntoDatabase(joke) {
  try {
    const connection = await mysql.createConnection({
      host: DB_HOST,
      user: DB_USER,
      password: DB_PASSWORD,
      database: DB_NAME
    });

    // Check if joke type exists in the database
    const [typeRows, _] = await connection.execute('SELECT id FROM joke_types WHERE type = ?', [joke.type]);
    let typeId;
    if (typeRows.length === 0) {
      // If joke type does not exist, insert it into the database
      const [result, _] = await connection.execute('INSERT INTO joke_types (type) VALUES (?)', [joke.type]);
      typeId = result.insertId;
    } else {
      typeId = typeRows[0].id;
    }

    // Insert joke into the database
    await connection.execute('INSERT INTO jokes (type_id, setup, punchline) VALUES (?, ?, ?)', [typeId, joke.setup, joke.punchline]);
    
    // Close database connection
    await connection.end();
  } catch (error) {
    console.error('Error inserting joke into database:', error);
  }
}

// Example transformation function
function transformJoke(joke) {
    // Here, I can perform any transformation logic you need
    // For example, I can capitalize the setup and punchline
    return {
      type: joke.type,
      setup: joke.setup.toUpperCase(),
      punchline: joke.punchline.toUpperCase()
    };
}
  

module.exports = { startConsuming };
