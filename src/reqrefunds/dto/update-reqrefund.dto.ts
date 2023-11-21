import { PartialType } from '@nestjs/mapped-types';
import { CreateReqrefundDto } from './create-reqrefund.dto';

export class UpdateReqrefundDto extends PartialType(CreateReqrefundDto) {}
