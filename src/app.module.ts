import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ObjectModule } from './object/object.module';
import { PrismaService } from './prisma.service';
import { StorageModule } from './storage/storage.module';

@Module({
  imports: [ObjectModule, StorageModule],
  controllers: [AppController],
  providers: [AppService ,PrismaService],
})
export class AppModule {}
