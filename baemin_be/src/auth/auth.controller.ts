import { Controller, Post, Body, UseGuards, HttpCode, HttpStatus, UnauthorizedException, Get, Request } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthGuard } from './auth.guard';
import { CreateUserDto } from '../users/dto/create-user.dto';
import { LoginUserDto } from '../users/dto/login-user.dto';


@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  @HttpCode(HttpStatus.OK) // Sets the response status code to 200
  async login(@Body() loginDto: LoginUserDto) {
    const user = await this.authService.validateUser(loginDto.email, loginDto.password);
    if (!user) {
      throw new UnauthorizedException(); // Throw error if user is not found
    }
    return await this.authService.login(user); // Returns JWT token
  }

  @Post('register')
  @HttpCode(HttpStatus.CREATED) // Sets the response status code to 201
  async register(@Body() createUserDto: CreateUserDto) {
    return await this.authService.create(createUserDto.email, createUserDto.password); // Registers a new user
  }

  @UseGuards(AuthGuard)
  @Get('user-id')
  async getUserId(@Request() req) {
    return await this.authService.getUserIdFromToken(req.headers.authorization.split(' ')[1]);
  }
}
