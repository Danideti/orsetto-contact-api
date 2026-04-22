export class ContactResponseDto {
  name: string;
  email: string;
  message: string;
  source: string;
  status: string;
  createdAt: Date;

  static fromEntity(contact: any): ContactResponseDto {
    const dto = new ContactResponseDto();
    dto.name = contact.name;
    dto.email = contact.email;
    dto.message = contact.message;
    dto.source = contact.source;
    dto.status = contact.status;
    dto.createdAt = contact.createdAt;
    return dto;
  }
}