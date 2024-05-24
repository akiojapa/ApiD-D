import { HttpModuleOptions, HttpModuleOptionsFactory } from "@nestjs/axios/dist/interfaces/http-module.interface";
import { ConfigService } from "@nestjs/config/dist/config.service";
import { Injectable } from "@nestjs/common/decorators/core/injectable.decorator";

@Injectable()
export class DDConfig implements HttpModuleOptionsFactory {
    constructor(private configService: ConfigService) { }

    createHttpOptions(): HttpModuleOptions {
        return {
            baseURL: this.configService.get('base_url', { infer: true })
        };
    }
}