import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { S3 } from 'aws-sdk';

@Injectable()
export class AwsS3Service {
  constructor(private prisma: PrismaService) {}

  s3 = new S3({
    accessKeyId: process.env.ACCESS_KEY_ID,
    secretAccessKey: process.env.SECRET_ACCESS_KEY,
  });

  async upload(file: Express.Multer.File, key: string) {
    const params = {
      Bucket: process.env.BUCKET_NAME,
      Key: key,
      Body: file.buffer,
      ContentType: file.mimetype,
      ContentDisposition: 'inline', 
      CreateBucketConfiguration: {
        LocationConstraint: 'us-east-1',
      },
    };
    await this.s3.upload(params).promise();
  }

  async getImage(key: string): Promise<Buffer> {
    const params = {
      Bucket: process.env.BUCKET_NAME,
      Key: key,
    };
    const data = await this.s3.getObject(params).promise();
    return data.Body as Buffer;
  }
}
