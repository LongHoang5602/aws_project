import { Module } from '@nestjs/common';
import { ReceiptsService } from './receipts.service';
import { ReceiptsController } from './receipts.controller';
import { ReceiptRepository } from './receipt.repo';

@Module({
  controllers: [ReceiptsController],
  providers: [ReceiptsService, ReceiptRepository],
})
export class ReceiptsModule { }
