import { Module } from '@nestjs/common/decorators/modules/module.decorator';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose/dist/mongoose.module';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MonstersModule } from './monsters/monsters.module';

@Module({
  imports: [
    MongooseModule.forRootAsync({
      imports: [ConfigModule.forRoot()],
      useFactory: async (configService: ConfigService) => {
        const mongodbUri = configService.get<string>('MONGODB_URI');
        console.log('MONGODB_URI:', mongodbUri);
        return { uri: mongodbUri };
      },
      inject: [ConfigService],
    }),
    UsersModule,
    AuthModule,
    MonstersModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }