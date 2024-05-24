import { HttpModule } from "@nestjs/axios";
import { Module } from "@nestjs/common/decorators/modules/module.decorator";
import { ConfigModule } from "@nestjs/config/dist/config.module";
import { DDService } from "./dd.service";
import { DDConfig } from "./dd.config";

@Module({
    imports: [
        ConfigModule.forRoot(),
        HttpModule.registerAsync({
            imports: [ConfigModule],
            useClass: DDConfig,
        }),
    ],
    providers: [DDService],
    exports: [DDService],
})
export class DDModule { }