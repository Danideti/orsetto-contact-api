export class ContactHelpers {
  static sanitizeName(name: string): string {
    return name.trim().replace(/\s+/g, ' ');
  }

  static sanitizeEmail(email: string): string {
    return email.trim().toLowerCase();
  }

  static sanitizeMessage(message: string): string {
    return message.trim();
  }

  static formatDate(date: Date): string {
    return date.toISOString().replace('T', ' ').substring(0, 19);
  }
}