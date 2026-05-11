import { NotificationRetryJob } from './notification-retry.job';
import { PrismaService } from '../../infrastructure/database/prisma.service';
import { EmailjsService } from '../../infrastructure/email/emailjs.service';

const mockPrisma = {
  primary: {
    contact: {
      findMany: jest.fn(),
      update: jest.fn(),
    },
  },
};

const mockEmailService = {
  sendContactNotification: jest.fn(),
};

describe('NotificationRetryJob', () => {
  let job: NotificationRetryJob;

  beforeEach(() => {
    jest.clearAllMocks();
    job = new NotificationRetryJob(
      mockPrisma as unknown as PrismaService,
      mockEmailService as unknown as EmailjsService,
    );
  });

  it('no hace nada si no hay notificaciones pendientes', async () => {
    mockPrisma.primary.contact.findMany.mockResolvedValue([]);

    await job.retryFailedNotifications();

    expect(mockEmailService.sendContactNotification).not.toHaveBeenCalled();
    expect(mockPrisma.primary.contact.update).not.toHaveBeenCalled();
  });

  it('envía el correo y actualiza a SENT cuando tiene éxito', async () => {
    mockPrisma.primary.contact.findMany.mockResolvedValue([
      { id: '1', name: 'Dani', email: 'dani@test.com', message: 'Hola', source: 'web', notificationRetries: 0 },
    ]);
    mockEmailService.sendContactNotification.mockResolvedValue(undefined);
    mockPrisma.primary.contact.update.mockResolvedValue({});

    await job.retryFailedNotifications();

    expect(mockEmailService.sendContactNotification).toHaveBeenCalledTimes(1);
    expect(mockPrisma.primary.contact.update).toHaveBeenCalledWith({
      where: { id: '1' },
      data: expect.objectContaining({ notificationStatus: 'SENT' }),
    });
  });

  it('actualiza a FAILED cuando falla y tiene reintentos disponibles', async () => {
    mockPrisma.primary.contact.findMany.mockResolvedValue([
      { id: '2', name: 'Edwin', email: 'edwin@test.com', message: 'Test', source: 'web', notificationRetries: 1 },
    ]);
    mockEmailService.sendContactNotification.mockRejectedValue(new Error('SMTP error'));
    mockPrisma.primary.contact.update.mockResolvedValue({});

    await job.retryFailedNotifications();

    expect(mockPrisma.primary.contact.update).toHaveBeenCalledWith({
      where: { id: '2' },
      data: expect.objectContaining({
        notificationStatus: 'FAILED',
        notificationRetries: 2,
      }),
    });
  });

  it('actualiza a DEAD_LETTER cuando se agotan los reintentos', async () => {
    mockPrisma.primary.contact.findMany.mockResolvedValue([
      { id: '3', name: 'Test', email: 'test@test.com', message: 'Test', source: 'web', notificationRetries: 2 },
    ]);
    mockEmailService.sendContactNotification.mockRejectedValue(new Error('SMTP error'));
    mockPrisma.primary.contact.update.mockResolvedValue({});

    await job.retryFailedNotifications();

    expect(mockPrisma.primary.contact.update).toHaveBeenCalledWith({
      where: { id: '3' },
      data: expect.objectContaining({
        notificationStatus: 'DEAD_LETTER',
        notificationRetries: 3,
      }),
    });
  });
});