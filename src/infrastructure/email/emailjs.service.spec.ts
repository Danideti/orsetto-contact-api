import { EmailjsService } from './emailjs.service';

const mockSend = jest.fn();

jest.mock('@emailjs/nodejs', () => {
  return {
    __esModule: true,
    default: {
      send: (...args: any[]) => mockSend(...args),
    },
  };
});

describe('EmailjsService', () => {
  let service: EmailjsService;

  beforeEach(() => {
    service = new EmailjsService();
    jest.clearAllMocks();
  });

  it('debe llamar a emailjs.send con los datos correctos', async () => {
    mockSend.mockResolvedValue({ status: 200, text: 'OK' });

    await service.sendContactNotification({
      name: 'Dani',
      email: 'dani@test.com',
      message: 'Hola prueba',
      source: 'web',
    });

    expect(mockSend).toHaveBeenCalledTimes(1);
  });

  it('debe lanzar error si emailjs falla', async () => {
    mockSend.mockRejectedValue(new Error('EmailJS error'));

    await expect(
      service.sendContactNotification({
        name: 'Dani',
        email: 'dani@test.com',
        message: 'Hola prueba',
        source: 'web',
      })
    ).rejects.toThrow('EmailJS error');
  });
});