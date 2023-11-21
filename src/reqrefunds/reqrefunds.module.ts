import { Module } from '@nestjs/common';
import { ReqrefundsService } from './reqrefunds.service';
import { ReqrefundsController } from './reqrefunds.controller';
import { ReqrefundRepository } from './reqrefund.repo';

@Module({
  controllers: [ReqrefundsController],
  providers: [ReqrefundsService, ReqrefundRepository],
})
export class ReqrefundsModule { }
