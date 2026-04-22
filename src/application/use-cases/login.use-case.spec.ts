import { LoginUseCase } from './login.use-case';
import { JwtService } from '@nestjs/jwt';
import { UnauthorizedException } from '@nestjs/common';

describe('LoginUseCase', () => {
  let useCase: LoginUseCase;
  let mockJwtService: jest.Mocked<JwtService>;

  beforeEach(() => {
    mockJwtService = {
      sign: jest.fn().mockReturnValue('token_falso_123'),
    } as any;
    useCase = new LoginUseCase(mockJwtService);
  });

  it('debe retornar token con credenciales correctas', async () => {
    const result = await useCase.execute('admin@orsetto.pro', 'orsetto2026');

    expect(result.token).toBe('token_falso_123');
    expect(mockJwtService.sign).toHaveBeenCalledTimes(1);
  });

  it('debe lanzar UnauthorizedException con credenciales incorrectas', async () => {
    await expect(
      useCase.execute('malo@test.com', 'passwordmalo')
    ).rejects.toThrow(UnauthorizedException);

    expect(mockJwtService.sign).not.toHaveBeenCalled();
  });
});