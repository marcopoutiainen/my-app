import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import * as request from 'request-promise-native';

@Injectable()
export class UsersService {
  constructor(@InjectModel('User') private readonly userModel: Model<any>) {}

  async createUser(body: any) {
    const user = await this.userModel.create(body);

    return user;
  }

  async getUser(userId: string) {
    const user = await request.get(`https://reqres.in/api/users/${userId}`, {
      json: true,
    });
    return user.data;
  }

  async getUserAvatar(userId: string) {
    const user = await this.userModel.findOne({ userId }).exec();

    if (!user || !user.avatar) {
      const avatar = await request.get(
        `https://reqres.in/api/users/${userId}/avatar`,
        {
          encoding: null,
        },
      );

      const base64Avatar = avatar.toString('base64');

      await this.userModel.create({
        userId,
        avatar: base64Avatar,
      });

      return base64Avatar;
    }

    return user.avatar;
  }

  async deleteUserAvatar(userId: string) {
    const user = await this.userModel.findOneAndDelete({ userId }).exec();

    if (!user) {
      throw new Error('User not found');
    }

    return;
  }
}
