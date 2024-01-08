import { Injectable } from '@nestjs/common';

@Injectable()
export class UserCreatedEvent {
  constructor(public readonly userId: number, public readonly email: string) {}

  async publish() {
    const pattern = { cmd: 'user_created' };
    const payload = { userId: this.userId, email: this.email };
  }
}
