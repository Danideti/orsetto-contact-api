import { IContactRepository } from '../../domain/repositories/contact.repository';
import { Contact } from '../../domain/entities/contact.entity';

export class GetContactsUseCase {
  constructor(private readonly contactRepository: IContactRepository) {}

  async execute(): Promise<Contact[]> {
    return this.contactRepository.findAll();
  }
}