import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ReqrefundsService } from './reqrefunds.service';
import { CreateReqrefundDto } from './dto/create-reqrefund.dto';
import { UpdateReqrefundDto } from './dto/update-reqrefund.dto';

@Controller('reqrefunds')
export class ReqrefundsController {
  constructor(private readonly reqrefundsService: ReqrefundsService) { }

  @Post()
  create(@Body() createReqrefundDto: CreateReqrefundDto) {
    return this.reqrefundsService.create(createReqrefundDto);
  }

  @Get()
  findAll() {
    return this.reqrefundsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.reqrefundsService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateReqrefundDto: UpdateReqrefundDto) {
    return this.reqrefundsService.update(id, updateReqrefundDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.reqrefundsService.remove(id);
  }
}
