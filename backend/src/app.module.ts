import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AuthController } from './modules/auth/auth.controller';
import { AppService } from './app.service';
import { AuthService } from './modules/auth/auth.service';
import { PrismaService } from 'prisma/prisma.service';
import { ConfigService } from '@nestjs/config';

@Module({
  imports: [],
  controllers: [AppController, AuthController],
  providers: [AppService, AuthService, PrismaService, ConfigService],
})
export class AppModule {}
