import { Contact } from '../entities/contact.entity';

export interface IContactRepository {
  save(contact: Contact): Promise<Contact>;
  findAll(): Promise<Contact[]>;
}