import config from '../../config';
import amqp from 'amqplib/callback_api';

const CONN_URL = config.rabbitMqUrl;
const EXCHANGE = "TIGER_EXCHANGE";

let ch = null;

amqp.connect(CONN_URL, function (err, conn) {
   conn.createChannel(function (err, channel) {
      ch = channel;
      ch.assertExchange(EXCHANGE, 'fanout', {durable: false})
   });
});

export const publishToQueue = async (data, queueName = '') => {
   ch.publish(EXCHANGE,queueName, Buffer.from(data));
}

process.on('exit', (code) => {
   ch.close();
   console.log(`Closing rabbitmq channel`);
});