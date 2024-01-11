import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { User } from './entities/user.entity';
import { Role } from './constants/role.enum';
interface GodSearch {
  limit: number;
  page: number;
  role?: Role;
}
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  create(@Body() createUserDto: User) {
    return this.usersService.create(createUserDto);
  }

  @Get()
  findAll() {
    return this.usersService.findAll();
  }
  @Post('find')
  findByPagination(@Body() body: GodSearch) {
    const { limit, page, role } = body;
    if (!limit || !page)
      throw new HttpException(
        'limit and page are required for this functionality',
        HttpStatus.PRECONDITION_FAILED,
      );
    return this.usersService.findByPagination(page, limit, role);
  }

  @Get(':email')
  findOne(@Param('email') email: string) {
    return this.usersService.findOne(email);
  }

  @Patch(':email')
  update(@Param('email') email: string, @Body() updateUserDto: User) {
    return this.usersService.update(email, updateUserDto);
  }
}
