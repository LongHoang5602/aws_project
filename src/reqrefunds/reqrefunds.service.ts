import { Injectable } from '@nestjs/common';
import { CreateReqrefundDto } from './dto/create-reqrefund.dto';
import { UpdateReqrefundDto } from './dto/update-reqrefund.dto';
import { Reqrefund } from './entities/reqrefund.entity';
import { ReqrefundRepository } from './reqrefund.repo';

@Injectable()
export class ReqrefundsService {
  constructor(private readonly repo: ReqrefundRepository) {

  }
  create(createReceiptDto: CreateReqrefundDto) {
    return this.repo.upsertOne(Reqrefund.newInstanceFromDTO(createReceiptDto));
  }

  findAll() {
    return this.repo.findAll()
  }

  findOne(id: string) {
    return this.repo.findReqrefundByID(id);
  }

  async update(id: string, updateReqrefundDto: UpdateReqrefundDto) {
    const existReqRefund = await this.repo.findReqrefundByID(id)
    if (updateReqrefundDto.status) {
      existReqRefund.status = updateReqrefundDto.status
    }
    existReqRefund.updateAt = new Date()
    return this.repo.upsertOne(existReqRefund);
  }


  remove(id: string) {
    return this.repo.deleteReqrefundByID(id);
  }
}
