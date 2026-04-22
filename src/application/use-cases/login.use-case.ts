import { JwtService } from '@nestjs/jwt';
import { UnauthorizedException } from '@nestjs/common';

export class LoginUseCase {
  constructor(private readonly jwtService: JwtService) {}

  async execute(email: string, password: string): Promise<{ token: string }> {
    // Por ahora usamos credenciales hardcodeadas
    // Después se conectará a una tabla de usuarios
    if (email !== 'admin@orsetto.pro' || password !== 'orsetto2026') {
      throw new UnauthorizedException('Credenciales inválidas');
    }

    const token = this.jwtService.sign({
      sub: '1',
      email,
    });

    return { token };
  }
}