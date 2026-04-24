import { Module } from '@nestjs/common';
import { ObjectController } from './object.controller';
import { ObjectService } from './object.service';
import { PrismaService } from 'src/prisma.service';
import { StorageModule } from 'src/storage/storage.module';
import { EventsModule } from 'src/events/events.module';

@Module({
  imports: [StorageModule ,EventsModule],
  controllers: [ObjectController],
  providers: [ObjectService ,PrismaService]
})
export class ObjectModule {}
