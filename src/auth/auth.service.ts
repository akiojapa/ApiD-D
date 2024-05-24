import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt/dist/jwt.service';
import { UsersService } from 'src/users/users.service';
@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService
  ) { }
  
  async create(email: string, password: string) {
    const user = await this.usersService.findByEmail(email);
  
    if (!user || !await this.usersService.checkPassword(password, user.password)) {
      throw new UnauthorizedException('Email or password incorrect');
    }
  
    const payload = { sub: user.id, username: user.email };
    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }
}