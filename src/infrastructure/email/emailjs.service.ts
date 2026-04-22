import { Injectable } from '@nestjs/common';
import emailjs from '@emailjs/nodejs';

@Injectable()
export class EmailjsService {
  async sendContactNotification(data: {
    name: string;
    email: string;
    message: string;
    source: string;
  }): Promise<void> {
    await emailjs.send(
      process.env.EMAILJS_SERVICE_ID!,
      process.env.EMAILJS_TEMPLATE_ID!,
      {
        name: data.name,
        email: data.email,
        message: data.message,
        source: data.source,
      },
      {
        publicKey: process.env.EMAILJS_PUBLIC_KEY!,
        privateKey: process.env.EMAILJS_PRIVATE_KEY!,
      },
    );
  }
}