import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, FindManyOptions } from 'typeorm';

import { User } from '@/entities';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly user: Repository<User>,
  ) {}

  public async create(data: Partial<User>): Promise<User> {
    return this.user.save(data);
  }

  public async remove(email: string): Promise<void> {
    await this.user.delete({ email });
  }

  public async update(email: string, data: Partial<User>): Promise<void> {
    await this.user.update({ email }, data);
  }

  public async find() {
    return this.user.find();
  }

  public async findOne(email: string) {
    return this.user.findOneBy({ email });
  }

  public async exist(condition: FindManyOptions<User>) {
    return this.user.exist(condition);
  }

  public async getProfile(email: string) {
    return this.user.findOne({
      where: { email },
      select: {
        email: true,
        nickname: true,
        signature: true,
        score: true,
        topicCount: true,
        starCount: true,
        collectCount: true,
        followerCount: true,
        followingCount: true,
      },
    });
  }
}
