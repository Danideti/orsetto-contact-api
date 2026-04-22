import { AuthController } from './auth.controller';
import { LoginUseCase } from '../../application/use-cases/login.use-case';

describe('AuthController', () => {
  let controller: AuthController;
  let mockLoginUseCase: jest.Mocked<LoginUseCase>;

  beforeEach(() => {
    mockLoginUseCase = { execute: jest.fn() } as any;
    controller = new AuthController(mockLoginUseCase);
  });

  it('debe retornar token con credenciales correctas', async () => {
    mockLoginUseCase.execute.mockResolvedValue({ token: 'token_123' });

    const result = await controller.login({
      email: 'admin@orsetto.pro',
      password: 'orsetto2026',
    });

    expect(result.token).toBe('token_123');
    expect(mockLoginUseCase.execute).toHaveBeenCalledWith('admin@orsetto.pro', 'orsetto2026');
  });
});