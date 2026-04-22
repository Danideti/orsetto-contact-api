import { Contact } from '../../domain/entities/contact.entity';
import { IContactRepository } from '../../domain/repositories/contact.repository';
import { EmailjsService } from '../../infrastructure/email/emailjs.service';
import { ContactHelpers } from '../../domain/helpers/contact.helpers';

export class SendContactUseCase {
  constructor(
    private readonly contactRepository: IContactRepository,
    private readonly emailService: EmailjsService,
  ) {}

  async execute(data: {
    name: string;
    email: string;
    message: string;
    source?: string;
  }): Promise<Contact> {
    const contact = new Contact(
      ContactHelpers.sanitizeName(data.name),
      ContactHelpers.sanitizeEmail(data.email),
      ContactHelpers.sanitizeMessage(data.message),
      data.source,
    );

    if (!contact.isValid()) {
      throw new Error('Datos de contacto inválidos');
    }

    const saved = await this.contactRepository.save(contact);

    await this.emailService.sendContactNotification({
      name: contact.name,
      email: contact.email,
      message: contact.message,
      source: contact.source,
    });

    return saved;
  }
}