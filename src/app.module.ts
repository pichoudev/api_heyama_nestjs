import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ObjectModule } from './object/object.module';
import { PrismaService } from './prisma.service';
import { StorageModule } from './storage/storage.module';
import { EventsGateway } from './events/events.gateway';
import { EventsModule } from './events/events.module';

@Module({
  imports: [ObjectModule, StorageModule ,EventsModule],
  controllers: [AppController],
  providers: [AppService ,PrismaService, EventsGateway],
})
export class AppModule {}
