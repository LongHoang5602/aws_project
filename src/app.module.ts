import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { ReceiptsModule } from './receipts/receipts.module';
import { ReqrefundsModule } from './reqrefunds/reqrefunds.module';
import { RefundsModule } from './refunds/refunds.module';

@Module({
  imports: [UsersModule, ReceiptsModule, ReqrefundsModule, RefundsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
