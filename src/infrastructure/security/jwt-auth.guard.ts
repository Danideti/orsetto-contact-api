import { Injectable, ExecutionContext, Logger, UnauthorizedException } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  private readonly logger = new Logger(JwtAuthGuard.name);

  canActivate(context: ExecutionContext) {
    const request = context.switchToHttp().getRequest();
    const authHeader = request.headers['authorization'];

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      this.logger.warn(
        `[JWT ATTEMPT] Request sin token a ${request.method} ${request.url} — IP: ${request.ip}`
      );
    }

    return super.canActivate(context);
  }

  handleRequest(err: any, user: any, info: any, context: ExecutionContext) {
    if (err || !user) {
      const request = context.switchToHttp().getRequest();
      this.logger.warn(
        `[JWT ATTEMPT] Token inválido o expirado en ${request.method} ${request.url} — Razón: ${info?.message ?? 'desconocida'} — IP: ${request.ip}`
      );
      throw err || new UnauthorizedException();
    }
    return user;
  }
}