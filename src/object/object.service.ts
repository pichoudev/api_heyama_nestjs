import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { StorageService } from '../storage/storage.service';
import { CreateObjectDto } from './dto/create-object.dto';

@Injectable()
export class ObjectService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly storage: StorageService,
  ) {}

//   fonction pour creer un nouveau objet
  async create(dto: CreateObjectDto, file: Express.Multer.File) {
    const imageUrl = await this.storage.uploadFile(file);

    return this.prisma.object.create({
      data: {
        title: dto.title,
        description: dto.description,
        imageUrl,
      },
    });
  }

  //   fonction pour retourne tous les objets
  async findAll() {
    return this.prisma.object.findMany({
      orderBy: { createdAt: 'desc' },
    });
  }


  //   fonction pour recuperer un objet par son id
  async findOne(id: string) {
    const object = await this.prisma.object.findUnique({ where: { id } });
    if (!object) throw new NotFoundException(`Object #${id} n'existe pas`);
    return object;
  }


  //   fonction pour supprimer un objet
  async delete(id: string) {
    const object = await this.findOne(id);
    await this.storage.deleteFile(object.imageUrl);
    return this.prisma.object.delete({ where: { id } });
  }
}