import { Module } from '@nestjs/common';
import { MailService } from './mail.service';
import { MailController } from './mail.controller';
import { ConfigService } from '@nestjs/config';
import { MailerModule } from '@nestjs-modules/mailer';

@Module({
  imports: [
    MailerModule.forRoot({
      transport: {
        host: 'email-smtp.ap-southeast-1.amazonaws.com',
        port: 587,
        secure: false,
        auth: {
          user: 'AKIAYZRP6K2Y5ZX5F56E',
          pass: 'BJPn5B00CxI/vp+XPh3zPp5L1190Q2fLWiOzrXI0Z161',
        },
      },
      defaults: {
        from: 'nhoxlong020220@gmail.com',
      }
    }),],
  controllers: [MailController],
  providers: [MailService, ConfigService],
})
export class MailModule { }
