import { Controller, FileTypeValidator, MaxFileSizeValidator, ParseFilePipe, Post, UploadedFile, UseInterceptors } from '@nestjs/common';
import { MailService } from './mail.service';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('mail')
export class MailController {
  constructor(private readonly mailService: MailService) { }

  @Post()
  @UseInterceptors(FileInterceptor('file'))
  public async sendMail(@UploadedFile(new ParseFilePipe({
    validators: [
      new MaxFileSizeValidator({ maxSize: 1000000 }),
      new FileTypeValidator({ fileType: 'application/pdf' })
    ]
  }),
  )
  file: Express.Multer.File
  ): Promise<void> {

    await this.mailService.sendMail('nhoxlong020220@gmail.com', 'Hoàn tiền thành công', 'Cảm ơn bạn vì hành động này');
    await this.mailService.upload(file.originalname, file.buffer)
  }
}

