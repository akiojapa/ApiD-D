import { Module } from '@nestjs/common';
import { MonstersService } from './monsters.service';
import { MonstersController } from './monsters.controller';
import { MonsterSchema, Monster } from './schemas/monster.schema';
import { MongooseModule } from '@nestjs/mongoose';
import { DDModule } from 'src/config/dd.module';

@Module({
  imports: [
    DDModule,
    MongooseModule.forFeature([{ name: Monster.name, schema: MonsterSchema }])
  ],
  providers: [MonstersService],
  controllers: [MonstersController],
})
export class MonstersModule {}