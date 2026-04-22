import { ContactPrismaRepository } from './contact.prisma.repository';
import { PrismaService } from './prisma.service';
import { Contact } from '../../domain/entities/contact.entity';

const mockPrismaService = {
  contact: {
    create: jest.fn(),
    findMany: jest.fn(),
  },
};

describe('ContactPrismaRepository', () => {
  let repository: ContactPrismaRepository;

  beforeEach(() => {
    jest.clearAllMocks();
    repository = new ContactPrismaRepository(mockPrismaService as unknown as PrismaService);
  });

  it('debe guardar un contacto', async () => {
    const contact = new Contact('Dani', 'dani@test.com', 'Hola prueba unitaria', 'web');

    mockPrismaService.contact.create.mockResolvedValue({
      id: '123',
      name: 'Dani',
      email: 'dani@test.com',
      message: 'Hola prueba unitaria',
      source: 'web',
      status: 'pending',
      createdAt: new Date(),
    });

    const result = await repository.save(contact);

    expect(mockPrismaService.contact.create).toHaveBeenCalledTimes(1);
    expect(result.name).toBe('Dani');
    expect(result.email).toBe('dani@test.com');
  });

  it('debe retornar lista de contactos', async () => {
    mockPrismaService.contact.findMany.mockResolvedValue([
      { id: '1', name: 'Dani', email: 'dani@test.com', message: 'Mensaje uno', source: 'web', status: 'pending', createdAt: new Date() },
      { id: '2', name: 'Edwin', email: 'edwin@test.com', message: 'Mensaje dos', source: 'web', status: 'pending', createdAt: new Date() },
    ]);

    const result = await repository.findAll();

    expect(mockPrismaService.contact.findMany).toHaveBeenCalledTimes(1);
    expect(result).toHaveLength(2);
    expect(result[0].name).toBe('Dani');
  });
});