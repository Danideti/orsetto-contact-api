import { Module } from '@nestjs/common';
import { ContactModule } from './contact.module';

// Módulo principal de la aplicación

@Module({
  imports: [ContactModule],
})
export class AppModule {}