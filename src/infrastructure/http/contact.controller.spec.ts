import { ContactController } from './contact.controller';
import { SendContactUseCase } from '../../application/use-cases/send-contact.use-case';
import { GetContactsUseCase } from '../../application/use-cases/get-contacts.use-case';
import { Contact } from '../../domain/entities/contact.entity';

describe('ContactController', () => {
  let controller: ContactController;
  let mockSendContactUseCase: jest.Mocked<SendContactUseCase>;
  let mockGetContactsUseCase: jest.Mocked<GetContactsUseCase>;

  beforeEach(() => {
    mockSendContactUseCase = { execute: jest.fn() } as any;
    mockGetContactsUseCase = { execute: jest.fn() } as any;
    controller = new ContactController(mockSendContactUseCase, mockGetContactsUseCase);
  });

  it('debe crear un contacto y retornar success true', async () => {
    const dto = { name: 'Dani', email: 'dani@test.com', message: 'Hola prueba completa' };
    const contact = new Contact('Dani', 'dani@test.com', 'Hola prueba completa', 'web');
    mockSendContactUseCase.execute.mockResolvedValue(contact);

    const result = await controller.create(dto);

    expect(result.success).toBe(true);
    expect(result.data).toBeDefined();
    expect(mockSendContactUseCase.execute).toHaveBeenCalledWith(dto);
  });

  it('debe retornar lista de contactos', async () => {
    const contacts = [
      new Contact('Dani', 'dani@test.com', 'Mensaje de prueba uno', 'web'),
      new Contact('Edwin', 'edwin@test.com', 'Mensaje de prueba dos', 'web'),
    ];
    mockGetContactsUseCase.execute.mockResolvedValue(contacts);

    const result = await controller.findAll();

    expect(result.success).toBe(true);
    expect(result.data).toHaveLength(2);
    expect(mockGetContactsUseCase.execute).toHaveBeenCalledTimes(1);
  });
});