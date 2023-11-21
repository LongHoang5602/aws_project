import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserRepository } from './users.repo';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService {
  constructor(private readonly repo: UserRepository) {

  }
  create(createUserDto: CreateUserDto) {
    return this.repo.upsertOne(User.newInstanceFromDTO(createUserDto));
  }

  findAll() {
    return this.repo.findAll()
  }

  findOne(id: string) {
    return this.repo.findUserByID(id);
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    const existUser = await this.repo.findUserByID(id)
    if (updateUserDto.name) {
      existUser.name = updateUserDto.name
    }
    existUser.updateAt = new Date()
    return this.repo.upsertOne(existUser);
  }

  remove(id: string) {
    return this.repo.deleteUserByID(id);
  }
}
