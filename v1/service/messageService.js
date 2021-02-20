// import config from '../../config';
// import amqp from 'amqplib/callback_api';

// const CONN_URL = config.rabbitMqUrl;
// const EXCHANGE = "TIGER_EXCHANGE";

// let ch = null;

// amqp.connect(CONN_URL, (err1, conn) => {

//    if(err1) {
//       throw err1
//    }
//    console.log('connected to channel');

//    conn.createChannel((err2, channel) => {
//       if (err2) {
//          throw err2;
//       }
//       console.log('created channel');
//       ch = channel;
//       ch.assertExchange(EXCHANGE, 'fanout', {durable: false})
//    });
// });

// export const publishToQueue = async (data, queueName = '') => {
//    console.log('published message');
//    ch.publish(EXCHANGE,queueName, Buffer.from(data));
// }

// process.on('exit', (code) => {
//    ch.close();
//    console.log(`Closing rabbitmq channel`);
// });