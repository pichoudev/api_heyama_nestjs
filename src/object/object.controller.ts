import {
  Controller, Get, Post, Delete,
  Param, Body, UploadedFile, UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ObjectService } from './object.service';
import { CreateObjectDto } from './dto/create-object.dto';

@Controller('objects')
export class ObjectController {
  constructor(private readonly objectService: ObjectService) {}

  // POST /objects
  @Post()
  @UseInterceptors(FileInterceptor('image'))
  create(
    @Body() dto: CreateObjectDto,
    @UploadedFile() file: Express.Multer.File,
  ) {
    return this.objectService.create(dto, file);
  }

  // GET /objects
  @Get()
  findAll() {
    return this.objectService.findAll();
  }

  // GET /objects/:id
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.objectService.findOne(id);
  }

  // DELETE /objects/:id
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.objectService.delete(id);
  }
}