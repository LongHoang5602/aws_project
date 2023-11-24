import { Injectable } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';
import { PutObjectCommand, S3Client } from '@aws-sdk/client-s3';

@Injectable()
export class MailService {
  private readonly s3Client = new S3Client({
    region: "ap-southeast-1"
  })
  constructor(private readonly mailerService: MailerService) { }

  public async upload(fileName: string, file: Buffer) {
    await this.s3Client.send(
      new PutObjectCommand({
        Bucket: 'aws-s3-hdbank',
        Key: fileName + Date.now(),
        Body: file
      })
    )
  }

  public async sendMail(to: string, subject: string, text: string, context: any): Promise<void> {
    await this.mailerService.sendMail({
      to,
      subject,
      text,
      context,
    });
  }
}

