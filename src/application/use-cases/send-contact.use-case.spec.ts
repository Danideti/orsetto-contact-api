import { SendContactUseCase } from './send-contact.use-case';
import { IContactRepository } from '../../domain/repositories/contact.repository';
import { EmailjsService } from '../../infrastructure/email/emailjs.service';
import { Contact } from '../../domain/entities/contact.entity';

describe('SendContactUseCase', () => {
  let useCase: SendContactUseCase;
  let mockRepository: jest.Mocked<IContactRepository>;
  let mockEmailService: jest.Mocked<EmailjsService>;

  beforeEach(() => {
    mockRepository = {
      save: jest.fn(),
      findAll: jest.fn(),
    };

    mockEmailService = {
      sendContactNotification: jest.fn(),
    } as any;

    useCase = new SendContactUseCase(mockRepository, mockEmailService);
  });

  it('debe guardar el contacto y enviar email con datos válidos', async () => {
    const input = {
      name: '  Dani  ',
      email: 'DANI@TEST.COM',
      message: 'Hola esto es una prueba',
    };

    const savedContact = new Contact('Dani', 'dani@test.com', 'Hola esto es una prueba', 'web');
    mockRepository.save.mockResolvedValue(savedContact);
    mockEmailService.sendContactNotification.mockResolvedValue();

    const result = await useCase.execute(input);

    expect(mockRepository.save).toHaveBeenCalledTimes(1);
    expect(mockEmailService.sendContactNotification).toHaveBeenCalledTimes(1);
    expect(result.name).toBe('Dani');
    expect(result.email).toBe('dani@test.com');
  });

  it('debe limpiar el nombre y convertir email a minúsculas', async () => {
    const input = {
      name: '  Dani  ',
      email: 'DANI@TEST.COM',
      message: 'Hola esto es una prueba',
    };

    const savedContact = new Contact('Dani', 'dani@test.com', 'Hola esto es una prueba', 'web');
    mockRepository.save.mockResolvedValue(savedContact);
    mockEmailService.sendContactNotification.mockResolvedValue();

    await useCase.execute(input);

    const contactGuardado = mockRepository.save.mock.calls[0][0];
    expect(contactGuardado.name).toBe('Dani');
    expect(contactGuardado.email).toBe('dani@test.com');
  });

  it('debe lanzar error si los datos son inválidos', async () => {
    const input = {
      name: '',
      email: 'no-es-email',
      message: 'corto',
    };

    await expect(useCase.execute(input)).rejects.toThrow('Datos de contacto inválidos');
    expect(mockRepository.save).not.toHaveBeenCalled();
    expect(mockEmailService.sendContactNotification).not.toHaveBeenCalled();
  });
});