import { Transport } from '@nestjs/microservices';
import { ConfigFactory } from '@nestjs/config';
import { RmqOptions } from '@nestjs/microservices';

export const rabbitmqConfig: ConfigFactory<RmqOptions> = () => ({
  transport: Transport.RMQ,
  options: {
    urls: ['amqp://localhost:5672'],
    queue: 'my_queue',
  },
});
