import { PipeTransform, Injectable, ArgumentMetadata, Logger } from '@nestjs/common';
import sanitizeHtml = require('sanitize-html');

@Injectable()
export class SanitizePipe implements PipeTransform {
  private readonly logger = new Logger(SanitizePipe.name);

  transform(value: any, metadata: ArgumentMetadata) {
    if (typeof value === 'string') {
      this.detectAndLog(value, metadata.data);
      return sanitizeHtml(value, { allowedTags: [], allowedAttributes: {} });
    }
    if (typeof value === 'object' && value !== null) {
      return this.sanitizeObject(value);
    }
    return value;
  }

  private sanitizeObject(obj: any): any {
    const sanitized: any = {};
    for (const key of Object.keys(obj)) {
      if (typeof obj[key] === 'string') {
        this.detectAndLog(obj[key], key);
        sanitized[key] = sanitizeHtml(obj[key], {
          allowedTags: [],
          allowedAttributes: {},
        });
      } else {
        sanitized[key] = obj[key];
      }
    }
    return sanitized;
  }

  private detectAndLog(value: string, field?: string): void {
    const htmlPattern = /<[^>]+>/;
    if (htmlPattern.test(value)) {
      this.logger.warn(
        `[XSS ATTEMPT] HTML malicioso detectado en campo "${field ?? 'unknown'}": ${value.substring(0, 100)}`
      );
    }
  }
}