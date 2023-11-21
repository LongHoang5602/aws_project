import { Injectable } from '@nestjs/common';
import { CreateReceiptDto } from './dto/create-receipt.dto';
import { ReceiptRepository } from './receipt.repo';
import { Receipt } from './entities/receipt.entity';

@Injectable()
export class ReceiptsService {
  constructor(private readonly repo: ReceiptRepository) {

  }
  create(createReceiptDto: CreateReceiptDto) {
    return this.repo.upsertOne(Receipt.newInstanceFromDTO(createReceiptDto));
  }

  findAll() {
    return this.repo.findAll()
  }

  findOne(id: string) {
    return this.repo.findReceiptByID(id);
  }


  remove(id: string) {
    return this.repo.deleteReceiptByID(id);
  }
}
