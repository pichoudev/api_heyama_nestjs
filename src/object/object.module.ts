import { Module } from '@nestjs/common';
import { ObjectController } from './object.controller';
import { ObjectService } from './object.service';
import { PrismaService } from 'src/prisma.service';
import { StorageModule } from 'src/storage/storage.module';

@Module({
  imports: [StorageModule],
  controllers: [ObjectController],
  providers: [ObjectService ,PrismaService]
})
export class ObjectModule {}
