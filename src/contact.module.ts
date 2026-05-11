import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { ContactController } from './infrastructure/http/contact.controller';
import { AuthController } from './infrastructure/http/auth.controller';
import { SendContactUseCase } from './application/use-cases/send-contact.use-case';
import { GetContactsUseCase } from './application/use-cases/get-contacts.use-case';
import { LoginUseCase } from './application/use-cases/login.use-case';
import { PrismaService } from './infrastructure/database/prisma.service';
import { ContactPrismaRepository } from './infrastructure/database/contact.prisma.repository';
import { JwtStrategy } from './infrastructure/security/jwt.strategy';
import { JwtService } from '@nestjs/jwt';
import { EmailjsService } from './infrastructure/email/emailjs.service';
import { ScheduleModule } from '@nestjs/schedule';
import { NotificationRetryJob } from './application/jobs/notification-retry.job';

@Module({
  imports: [
    PassportModule,
    ScheduleModule.forRoot(), 
    JwtModule.register({
      secret: process.env.JWT_SECRET ?? 'orsetto_secret',
      signOptions: { expiresIn: '1d' },
    }),
  ],
  controllers: [ContactController, AuthController],
  providers: [
    PrismaService,
    EmailjsService,
    JwtStrategy,
    NotificationRetryJob,
    {
      provide: SendContactUseCase,
      useFactory: (prisma: PrismaService, emailService: EmailjsService) => {
        const repository = new ContactPrismaRepository(prisma);
        return new SendContactUseCase(repository, emailService);
      },
      inject: [PrismaService, EmailjsService],
    },
    {
      provide: GetContactsUseCase,
      useFactory: (prisma: PrismaService) => {
        const repository = new ContactPrismaRepository(prisma);
        return new GetContactsUseCase(repository);
      },
      inject: [PrismaService],
    },
    {
      provide: LoginUseCase,
      useFactory: (jwtService: JwtService) => {
        return new LoginUseCase(jwtService);
      },
      inject: [JwtService],
    },
  ],
})
export class ContactModule {}