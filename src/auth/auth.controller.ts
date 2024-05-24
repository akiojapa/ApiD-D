import { Body, Controller, Param, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { ApiBadRequestResponse, ApiOkResponse, ApiParam, ApiTags } from '@nestjs/swagger';
import { IsObjectIdPipe } from 'nestjs-object-id';
import { loginUserDto } from 'src/users/dto/loginUser.dto';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) { }

  @Post("/login")
  @ApiOkResponse()
  @ApiBadRequestResponse()
  createToken(@Body() loginDto: loginUserDto) {
    return this.authService.create(loginDto.email, loginDto.password);
  }
}