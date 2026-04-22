import { IsEmail, IsNotEmpty, IsOptional, IsString, MinLength } from 'class-validator';

export class CreateContactDto {
  @IsNotEmpty({ message: 'El nombre es requerido' })
  @IsString()
  name: string;

  @IsEmail({}, { message: 'El email no es válido' })
  email: string;

  @IsNotEmpty({ message: 'El mensaje es requerido' })
  @MinLength(10, { message: 'El mensaje debe tener al menos 10 caracteres' })
  message: string;

  @IsOptional()
  @IsString()
  source?: string;
}