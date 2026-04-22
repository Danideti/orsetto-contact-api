import { GetContactsUseCase } from './get-contacts.use-case';
import { IContactRepository } from '../../domain/repositories/contact.repository';
import { Contact } from '../../domain/entities/contact.entity';

describe('GetContactsUseCase', () => {
  let useCase: GetContactsUseCase;
  let mockRepository: jest.Mocked<IContactRepository>;

  beforeEach(() => {
    mockRepository = {
      save: jest.fn(),
      findAll: jest.fn(),
    };
    useCase = new GetContactsUseCase(mockRepository);
  });

  it('debe retornar lista de contactos', async () => {
    const contacts = [
      new Contact('Dani', 'dani@test.com', 'Mensaje de prueba uno', 'web'),
      new Contact('Edwin', 'edwin@test.com', 'Mensaje de prueba dos', 'web'),
    ];
    mockRepository.findAll.mockResolvedValue(contacts);

    const result = await useCase.execute();

    expect(result).toHaveLength(2);
    expect(mockRepository.findAll).toHaveBeenCalledTimes(1);
  });

  it('debe retornar lista vacía si no hay contactos', async () => {
    mockRepository.findAll.mockResolvedValue([]);

    const result = await useCase.execute();

    expect(result).toHaveLength(0);
  });
});