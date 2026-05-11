import { SanitizePipe } from './sanitize.pipe';

describe('SanitizePipe', () => {
  let pipe: SanitizePipe;

  beforeEach(() => {
    pipe = new SanitizePipe();
  });

  it('debe limpiar etiquetas HTML de un string', () => {
    const result = pipe.transform('<script>alert(1)</script>Hola', {} as any);
    expect(result).toBe('Hola');
  });

  it('debe limpiar etiquetas HTML en un objeto', () => {
    const result = pipe.transform(
      { name: '<b>Dani</b>', message: '<script>alert(1)</script>Test' },
      {} as any,
    );
    expect(result.name).toBe('Dani');
    expect(result.message).toBe('Test');
  });

  it('debe retornar el valor sin cambios si no es string ni objeto', () => {
    const result = pipe.transform(42, {} as any);
    expect(result).toBe(42);
  });

  it('debe retornar null sin cambios', () => {
    const result = pipe.transform(null, {} as any);
    expect(result).toBeNull();
  });

  it('debe limpiar atributos peligrosos en objetos', () => {
    const result = pipe.transform(
      { name: '<img src=x onerror=alert(1)>Dani' },
      {} as any,
    );
    expect(result.name).toBe('Dani');
  });

  it('debe conservar valores no string dentro de un objeto', () => {
    const result = pipe.transform(
      { name: 'Dani', age: 25 },
      {} as any,
    );
    expect(result.name).toBe('Dani');
    expect(result.age).toBe(25);
  });
});