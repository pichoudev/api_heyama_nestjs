import { Injectable } from '@nestjs/common';
import { S3Client, DeleteObjectCommand } from '@aws-sdk/client-s3';
import { Upload } from '@aws-sdk/lib-storage';
import { randomUUID } from 'crypto';

@Injectable()
export class StorageService {
  private s3: S3Client;
  private bucket: string;
  private publicUrl: string;

  constructor() {
    this.s3 = new S3Client({
      region: 'auto',
      endpoint: process.env.R2_ENDPOINT,
      credentials: {
        accessKeyId: process.env.R2_ACCESS_KEY_ID!,
        secretAccessKey: process.env.R2_SECRET_ACCESS_KEY!,
      },
    });
    this.bucket = process.env.R2_BUCKET_NAME!;
    this.publicUrl = process.env.R2_PUBLIC_URL!;
  }

  async uploadFile(file: Express.Multer.File): Promise<string> {
    const ext = file.originalname.split('.').pop();
    const key = `${randomUUID()}.${ext}`;

    const upload = new Upload({
      client: this.s3,
      params: {
        Bucket: this.bucket,
        Key: key,
        Body: file.buffer,
        ContentType: file.mimetype,
      },
    });

    await upload.done();

    return `${this.publicUrl}/${key}`;
  }

  async deleteFile(imageUrl: string): Promise<void> {
    const key = imageUrl.split('/').pop();

    if (!key) {
      throw new Error(`Impossible d'extraire la key depuis l'URL : ${imageUrl}`);
    }

    await this.s3.send(new DeleteObjectCommand({
      Bucket: this.bucket,
      Key: key,
    }));
  }
}