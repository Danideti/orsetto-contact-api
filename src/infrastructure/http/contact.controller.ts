import { Controller, Post, Get, Body, UseGuards } from '@nestjs/common';
import { SendContactUseCase } from '../../application/use-cases/send-contact.use-case';
import { GetContactsUseCase } from '../../application/use-cases/get-contacts.use-case';
import { CreateContactDto } from '../../application/dtos/create-contact.dto';
import { ContactResponseDto } from '../../application/dtos/contact-response.dto';
import { ApiResponse } from '../../application/dtos/api-response.poco';
import { JwtAuthGuard } from '../security/jwt-auth.guard';

@Controller('contact')
export class ContactController {
  constructor(
    private readonly sendContactUseCase: SendContactUseCase,
    private readonly getContactsUseCase: GetContactsUseCase,
  ) {}

  @Post()
  async create(@Body() dto: CreateContactDto): Promise<ApiResponse<ContactResponseDto>> {
    const contact = await this.sendContactUseCase.execute(dto);
    return ApiResponse.ok(ContactResponseDto.fromEntity(contact));
  }

  @Get()
  @UseGuards(JwtAuthGuard)
  async findAll(): Promise<ApiResponse<ContactResponseDto[]>> {
    const contacts = await this.getContactsUseCase.execute();
    return ApiResponse.ok(contacts.map(ContactResponseDto.fromEntity));
  }
}