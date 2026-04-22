import { ContactHelpers } from './contact.helpers';

describe('ContactHelpers', () => {
  it('debe eliminar espacios del nombre', () => {
    expect(ContactHelpers.sanitizeName('  Dani  ')).toBe('Dani');
  });

  it('debe eliminar espacios dobles del nombre', () => {
    expect(ContactHelpers.sanitizeName('Dani  Tinoco')).toBe('Dani Tinoco');
  });

  it('debe convertir email a minúsculas', () => {
    expect(ContactHelpers.sanitizeEmail('DANI@TEST.COM')).toBe('dani@test.com');
  });

  it('debe eliminar espacios del mensaje', () => {
    expect(ContactHelpers.sanitizeMessage('  Hola  ')).toBe('Hola');
  });

  it('debe formatear fecha correctamente', () => {
    const date = new Date('2026-03-16T20:00:00.000Z');
    const result = ContactHelpers.formatDate(date);
    expect(result).toBe('2026-03-16 20:00:00');
  });
});