import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Monster } from './schemas/monster.schema';
import { DDService } from 'src/config/dd.service';

@Injectable()
export class MonstersService {
  constructor(
    @InjectModel(Monster.name) private monsterModel: Model<Monster>,
    private readonly DDService: DDService,
  ) {}
  
  async findAll(): Promise<Monster[]> {

    let monsters = await this.monsterModel.find();

    if (monsters.length > 0) {
      return monsters;
    }

    const APIMonster = await this.getMonsterApi();
    new this.monsterModel(APIMonster).save()
    return [APIMonster]

  }

  async findOne(id: string): Promise<Monster> {
    return this.monsterModel.findById(id);
  }

  async update(id: string, monster: Monster): Promise<Monster> {
    return this.monsterModel.findByIdAndUpdate(id, monster);
  }

  async remove(id: string): Promise<Monster> {
    return this.monsterModel.findByIdAndDelete(id);
  }

  async create(monster: Monster): Promise<Monster> {
    return new this.monsterModel(monster).save();
  }

  private async getMonsterApi() {
  
    return this.DDService.fetchAndSaveMonster();

  }


}