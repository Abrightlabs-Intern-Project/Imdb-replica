import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';

@Injectable()
export class AwsS3Service {
  private s3Client: S3Client;

  constructor(private prisma: PrismaService) {
    this.s3Client = new S3Client({
      region: 'us-east-1',
      credentials: {
        accessKeyId: process.env.ACCESS_KEY_ID,
        secretAccessKey: process.env.SECRET_ACCESS_KEY,
      },
    });
  }

  async upload(file: Express.Multer.File, key: string) {
    const params = {
      Bucket: process.env.BUCKET_NAME,
      Key: key,
      Body: file.buffer,
      ContentType: file.mimetype,
      ContentDisposition: 'inline',
    };

    try {
      const command = new PutObjectCommand(params);
      const response = await this.s3Client.send(command);
      console.log('Upload successful', response);
    } catch (err) {
      console.error('Error uploading file:', err);
      throw err;
    }
  }

  // AWS charges for this when it exceeds certain limit 
  // Alternate: Make the image as public url to directly get it from aws with the image key

  /* 
  async getImage(key: string): Promise<Buffer> {
    const command = new GetObjectCommand({
      Bucket: process.env.BUCKET_NAME,
      Key: key,
    });

    try {
      const response = await this.s3Client.send(command);
      return await response.Body.transformToByteArray();
    } catch (err) {
      console.error('Error getting image:', err);
      throw err;
    }
  }
  */
}