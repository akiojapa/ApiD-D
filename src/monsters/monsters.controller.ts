import { Body, Controller, Delete, Get, Param, Post, Put, UseGuards, BadRequestException } from '@nestjs/common';
import { MonstersService } from './monsters.service';
import { ApiBadRequestResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from 'src/auth/auth.guard';
import { Monster } from './schemas/monster.schema';

@ApiTags('monsters')
@Controller('monsters')
export class MonstersController {
  constructor(private readonly monstersService: MonstersService) {}

  @UseGuards(AuthGuard)
  @Get()
  @ApiOkResponse()
  @ApiBadRequestResponse()
  async findAll() {
    try {
      return this.monstersService.findAll();
    } catch (error) {
      throw new BadRequestException(error);
    }
  }

  @UseGuards(AuthGuard)
  @Get(':id')
  @ApiOkResponse()
  @ApiBadRequestResponse()
  async findOne(@Param('id') id: string): Promise<Monster> {
    try {
      return this.monstersService.findOne(id);
    } catch (error) {
      throw new BadRequestException(error);
    }
  }

  @UseGuards(AuthGuard)
  @Put(':id')
  @ApiOkResponse()
  @ApiBadRequestResponse()
  async update(@Param('id') id: string, @Body() monster: Monster): Promise<Monster> {
    try {
      return this.monstersService.update(id, monster);
    } catch (error) {
      throw new BadRequestException(error);
    }
  }

  @UseGuards(AuthGuard)
  @Delete(':id')
  @ApiOkResponse()
  @ApiBadRequestResponse()
  async remove(@Param('id') id: string): Promise<Monster> {
    try {
      return this.monstersService.remove(id);
    } catch (error) {
      throw new BadRequestException(error);
    }
  }

  @UseGuards(AuthGuard)
  @Post()
  @ApiOkResponse()
  @ApiBadRequestResponse()
  async create(@Body() monster: Monster): Promise<Monster> {
    try {
      return this.monstersService.create(monster);
    } catch (error) {
      throw new BadRequestException(error);
    }
  }
}