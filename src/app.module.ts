import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { ReceiptsModule } from './receipts/receipts.module';
import { ReqrefundsModule } from './reqrefunds/reqrefunds.module';
import { RefundsModule } from './refunds/refunds.module';
import { MailModule } from './mail/mail.module';

@Module({
  imports: [UsersModule, ReceiptsModule, ReqrefundsModule, RefundsModule, MailModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
