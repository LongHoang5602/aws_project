import { Module } from '@nestjs/common';
import { RefundsService } from './refunds.service';
import { RefundsController } from './refunds.controller';
import { RefundRepository } from './refund.repo';

@Module({
  controllers: [RefundsController],
  providers: [RefundsService, RefundRepository],
})
export class RefundsModule { }
