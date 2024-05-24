import { Controller, Get, Param } from '@nestjs/common';
import { MonstersService } from './monsters.service';
import { ApiBadRequestResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('monsters')
@Controller('monsters')
export class MonstersController {
  constructor(private readonly monstersService: MonstersService) {}

  @Get()
  @ApiOkResponse()
  @ApiBadRequestResponse()
  findAll() {
    return this.monstersService.findAll();
  }
}