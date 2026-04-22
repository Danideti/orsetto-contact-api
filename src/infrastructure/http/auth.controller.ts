import { Controller, Post, Body } from '@nestjs/common';
import { LoginUseCase } from '../../application/use-cases/login.use-case';
import { LoginDto } from '../../application/dtos/login.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly loginUseCase: LoginUseCase) {}

  @Post('login')
  async login(@Body() dto: LoginDto) {
    return this.loginUseCase.execute(dto.email, dto.password);
  }
}