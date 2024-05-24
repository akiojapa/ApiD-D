import { AxiosError, AxiosResponse } from "axios";
import { HttpService } from "@nestjs/axios/dist/http.service";
import { Injectable } from "@nestjs/common/decorators/core/injectable.decorator";
import { Monster } from "src/monsters/schemas/monster.schema";
import { ConfigService } from "@nestjs/config";

@Injectable()
export class DDService {
    constructor(
        private readonly httpService: HttpService,
        private configService: ConfigService,
    ) { }

    async fetchAndSaveMonster(): Promise<any> {
        const baseUrl = this.configService.get<string>('BASE_URL');
        const response: AxiosResponse<any> = await this.httpService
        .get(`${baseUrl}/monsters`)
          .toPromise();
    
        const monsterData = response.data;
    
        return monsterData;
      }

}