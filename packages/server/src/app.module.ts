import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { AuthModule } from '@/auth/auth.module';
import { RepliesModule } from '@/replies/replies.module';
import { SectionsModule } from '@/sections/sections.module';
import { TagsModule } from '@/tags/tags.module';
import { TopicsModule } from '@/topics/topics.module';
import { UsersModule } from '@/users/users.module';

import { AppController } from './app.controller';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    AuthModule,
    SectionsModule,
    TagsModule,
    TopicsModule,
    RepliesModule,
    UsersModule,
  ],
  controllers: [AppController],
})
export class AppModule {}
