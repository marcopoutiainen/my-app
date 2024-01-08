import { MongooseModuleOptions } from '@nestjs/mongoose';

export const mongoConfig: MongooseModuleOptions = {
  uri: 'mongodb://localhost/nestjs-rest-app',
  useNewUrlParser: true,
  useUnifiedTopology: true,
};
