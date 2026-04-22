import { ApiResponse } from './api-response.poco';

describe('ApiResponse', () => {
  it('debe crear respuesta exitosa con data', () => {
    const result = ApiResponse.ok({ name: 'Dani' });

    expect(result.success).toBe(true);
    expect(result.data).toEqual({ name: 'Dani' });
    expect(result.error).toBeUndefined();
  });

  it('debe crear respuesta de error', () => {
    const result = ApiResponse.fail('Algo salió mal');

    expect(result.success).toBe(false);
    expect(result.error).toBe('Algo salió mal');
    expect(result.data).toBeUndefined();
  });
});