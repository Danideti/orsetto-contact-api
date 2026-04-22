export class Contact {
  constructor(
    public readonly name: string,
    public readonly email: string,
    public readonly message: string,
    public readonly source: string = 'web',
    public readonly createdAt: Date = new Date(),
    public readonly status: 'pending' | 'read' = 'pending',
  ) {}

  isValid(): boolean {
    return (
      this.name.length > 0 &&
      this.email.includes('@') &&
      this.message.length > 10
    );
  }
}