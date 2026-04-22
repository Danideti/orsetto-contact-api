import { IContactRepository } from '../../domain/repositories/contact.repository';
import { Contact } from '../../domain/entities/contact.entity';
import { PrismaService } from './prisma.service';

export class ContactPrismaRepository implements IContactRepository {
  constructor(private readonly prisma: PrismaService) {}

  async save(contact: Contact): Promise<Contact> {
    const saved = await this.prisma.contact.create({
      data: {
        name: contact.name,
        email: contact.email,
        message: contact.message,
        source: contact.source,
        status: contact.status,
      },
    });
    return new Contact(
      saved.name,
      saved.email,
      saved.message,
      saved.source,
      saved.createdAt,
      saved.status as 'pending' | 'read',
    );
  }

  async findAll(): Promise<Contact[]> {
    const contacts = await this.prisma.contact.findMany();
    return contacts.map(
      (c) =>
        new Contact(
          c.name,
          c.email,
          c.message,
          c.source,
          c.createdAt,
          c.status as 'pending' | 'read',
        ),
    );
  }
} 