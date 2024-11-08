import { HttpException, HttpStatus, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { UsersService } from 'src/users/users.service';
import * as bcrypt from 'bcryptjs'

@Injectable()
export class AuthService {

  constructor(private usersService: UsersService,
    private jwtService: JwtService
  ) { }

  async login(userDto: CreateUserDto) {
    const user = await this.validateUser(userDto)
    return this.generateToken(user)
  }

  async registration(userDto: CreateUserDto) {
    const candidate = await this.usersService.findByEmail(userDto.email);
    if (candidate) {
      throw new HttpException('User with this email already exist', HttpStatus.BAD_REQUEST)
    }
    console.log({ candidate })
    const hashPassword = await bcrypt.hash(userDto.password, 5);
    console.log(hashPassword)
    const user = await this.usersService.createUser({ ...userDto, password: hashPassword })
    console.log(user)

    return this.generateToken(user)
  }

  private async generateToken(user) {
    const { password, ...userData } = user;

    return {
      token: this.jwtService.sign(userData)
    }
  }

  private async validateUser(userDto: CreateUserDto) {
    const user = await this.usersService.findByEmail(userDto.email);
    const passwordEquals = await bcrypt.compare(userDto.password, user.password);
    if (user && passwordEquals) {
      return user;
    }
    throw new UnauthorizedException({ message: 'Invalid email or password' })
  }
  
}
