import { Controller, Get, Post, Body, Patch, Param, Delete, ValidationPipe, UseGuards, BadRequestException } from '@nestjs/common';
import { UsersService } from './users.service';
import { createUserDto } from './dto/createUser.dto';
import { IsObjectIdPipe } from 'nestjs-object-id/dist/pipes/is-object-id.pipe';
import { updateUserDto } from './dto/updateUser.dto';
import { loginUserDto } from './dto/loginUser.dto';
import { ApiBadRequestResponse, ApiBearerAuth, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from 'src/auth/auth.guard';

@ApiTags('users')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) { }

  @Post()
  @ApiOkResponse()
  @ApiBadRequestResponse()
  async create(@Body(new ValidationPipe()) UserDto: createUserDto) {
    try {
      return this.usersService.create(UserDto);
    } catch (error) {
      throw new BadRequestException(error);
    }
  }

  @Get('/login')
  @ApiOkResponse()
  @ApiBadRequestResponse()
  async login(@Body(new ValidationPipe()) UserDto: loginUserDto) {
    try {
      return this.usersService.login(UserDto);
    } catch (error) {
      throw new BadRequestException(error);
    }
  }

  @Get('')
  @ApiOkResponse()
  @ApiBadRequestResponse()
  async findAll() {
    try {
      return this.usersService.findAll();
    } catch (error) {
      throw new BadRequestException(error);
    }
  }

  @Get(':id')
  @ApiOkResponse()
  @ApiBadRequestResponse()
  async findOne(@Param('id', IsObjectIdPipe) id: string) {
    try {
      return this.usersService.findOne(id);
    } catch (error) {
      throw new BadRequestException(error);
    }
  }

  @UseGuards(AuthGuard)
  @Patch(':id')
  @ApiOkResponse()
  @ApiBadRequestResponse()
  async update(@Param('id', IsObjectIdPipe) id: string, @Body(new ValidationPipe()) UserDto: updateUserDto) {
    try {
      return this.usersService.update(id, UserDto);
    } catch (error) {
      throw new BadRequestException(error);
    }
  }

  @UseGuards(AuthGuard)
  @Delete(':id')
  @ApiBearerAuth()
  @ApiOkResponse()
  @ApiBadRequestResponse()
  async remove(@Param('id', IsObjectIdPipe) id: string) {
    try {
      return this.usersService.remove(id);
    } catch (error) {
      throw new BadRequestException(error);
    }
  }
}