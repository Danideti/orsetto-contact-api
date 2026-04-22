import { Module } from '@nestjs/common';
import { ContactModule } from './contact.module';

@Module({
  imports: [ContactModule],
})
export class AppModule {}