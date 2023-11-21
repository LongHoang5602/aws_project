import { Injectable } from '@nestjs/common';
import { CreateRefundDto } from './dto/create-refund.dto';
import { UpdateRefundDto } from './dto/update-refund.dto';
import { RefundRepository } from './refund.repo';
import { Refund } from './entities/refund.entity';

@Injectable()
export class RefundsService {
  constructor(private readonly repo: RefundRepository) {

  }
  create(createReceiptDto: CreateRefundDto) {
    return this.repo.upsertOne(Refund.newInstanceFromDTO(createReceiptDto));
  }

  findAll() {
    return this.repo.findAll()
  }

  findOne(id: string) {
    return this.repo.findRefundByID(id);
  }

  async update(id: string, updateRefundDto: UpdateRefundDto) {
    const existRefund = await this.repo.findRefundByID(id)
    if (updateRefundDto.status) {
      existRefund.status = updateRefundDto.status
    }
    existRefund.updateAt = new Date()
    return this.repo.upsertOne(existRefund);
  }


  remove(id: string) {
    return this.repo.deleteRefundByID(id);
  }
}
