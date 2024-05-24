import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema()
export class Monster {
  @Prop()
  id: number;

  @Prop()
  name: string;

  @Prop()
  type: string;

  @Prop()
  hit_points: number;
}

export const MonsterSchema = SchemaFactory.createForClass(Monster);