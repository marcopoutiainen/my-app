import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { rabbitmqConfig } from '../rabbitmq.config';
import { UserModule } from './user.module';
import { UserCreatedEvent } from './user.events';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [rabbitmqConfig],
    }),
    ClientsModule.registerAsync([
      {
        name: 'RABBITMQ',
        useFactory: async (configService: ConfigService) => ({
          transport: Transport.RMQ,
          options: {
            urls: [configService.get<string>('rabbitmq.uri')],
            queue: configService.get<string>('rabbitmq.queue'),
          },
        }),
        inject: [ConfigService],
      },
    ]),
    UserModule,
  ],
})
export class RabbitMQModule {
  constructor() {
    const userCreatedEvent = new UserCreatedEvent(1, 'john@example.com');
    userCreatedEvent.publish();
  }
}
