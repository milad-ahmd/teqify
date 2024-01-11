import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { Role } from './constants/role.enum';

@Injectable()
export class UsersService {
  users: Array<User> = [];
  paginate(array, page_size, page_number) {
    return array.slice((page_number - 1) * page_size, page_number * page_size);
  }
  create(createUserDto: User) {
    const isUnique =
      this.users.findIndex(
        (u: User) =>
          u.email.toLowerCase() === createUserDto.email.toLowerCase(),
      ) === -1;
    if (isUnique) {
      this.users.push(createUserDto);
      return createUserDto;
    } else {
      throw new HttpException('Email is not unique', HttpStatus.BAD_REQUEST);
    }
  }

  findAll() {
    return this.users;
  }
  findByPagination(page: number, limit: number, role: Role) {
    if (role) {
      return this.paginate(
        this.users.filter((u: User) => u.role === role),
        limit,
        page,
      );
    } else {
      return this.paginate(this.users, limit, page);
    }
  }

  findOne(email: string) {
    const index = this.users.findIndex(
      (u: User) => u.email.toLowerCase() === email.toLowerCase(),
    );
    if (index) {
      return this.users[index];
    } else {
      throw new HttpException('user not found', HttpStatus.NOT_FOUND);
    }
  }

  update(email: string, updateUserDto: User) {
    const index = this.users.findIndex(
      (u: User) => u.email.toLowerCase() === updateUserDto.email.toLowerCase(),
    );
    if (index) {
      this.users[index] = updateUserDto;
      return true;
    } else {
      throw new HttpException('user not found', HttpStatus.NOT_FOUND);
    }
  }
}
