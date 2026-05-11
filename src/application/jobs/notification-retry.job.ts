import { Injectable, Logger } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { PrismaService } from '../../infrastructure/database/prisma.service';
import { EmailjsService } from '../../infrastructure/email/emailjs.service';

const MAX_RETRIES = 3;

@Injectable()
export class NotificationRetryJob {
  private readonly logger = new Logger(NotificationRetryJob.name);

  constructor(
    private readonly prisma: PrismaService,
    private readonly emailService: EmailjsService,
  ) {}

  @Cron(CronExpression.EVERY_MINUTE)
  async retryFailedNotifications() {
    this.logger.log('🔄 Buscando notificaciones pendientes...');

    const pending = await this.prisma.primary.contact.findMany({
      where: {
        notificationStatus: { in: ['PENDING', 'FAILED'] },
        notificationRetries: { lt: MAX_RETRIES },
      },
    });

    if (pending.length === 0) {
      this.logger.log('✅ No hay notificaciones pendientes.');
      return;
    }

    this.logger.log(`📬 ${pending.length} mensaje(s) para reintentar.`);

    for (const contact of pending) {
      try {
        await this.emailService.sendContactNotification({
          name: contact.name,
          email: contact.email,
          message: contact.message,
          source: contact.source,
        });

        await this.prisma.primary.contact.update({
          where: { id: contact.id },
          data: {
            notificationStatus: 'SENT',
            sentAt: new Date(),
          },
        });

        this.logger.log(`✅ Enviado correctamente: ${contact.id}`);
      } catch (error) {
        const newRetries = contact.notificationRetries + 1;
        const newStatus = newRetries >= MAX_RETRIES ? 'DEAD_LETTER' : 'FAILED';

        await this.prisma.primary.contact.update({
          where: { id: contact.id },
          data: {
            notificationStatus: newStatus,
            notificationRetries: newRetries,
            lastRetryAt: new Date(),
          },
        });

        this.logger.warn(
          `⚠️ Intento ${newRetries}/${MAX_RETRIES} fallido para ${contact.id} → ${newStatus}`,
        );
      }
    }
  }
}