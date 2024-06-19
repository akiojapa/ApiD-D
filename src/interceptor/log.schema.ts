import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';

export type LogDocument = HydratedDocument<Log>;

@Schema({ timestamps: true })
export class Log {
    
    @Prop({ type: mongoose.Schema.Types.Mixed })
    request: any;

    @Prop({ type: mongoose.Schema.Types.Mixed })
    response: any;

    @Prop({ type: mongoose.Schema.Types.Mixed })
    error: any;

    @Prop()
    responseTime: number;
}

export const LogSchema = SchemaFactory.createForClass(Log);