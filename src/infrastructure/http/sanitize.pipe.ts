import { PipeTransform, Injectable, ArgumentMetadata } from '@nestjs/common';
import sanitizeHtml = require('sanitize-html');

@Injectable()
export class SanitizePipe implements PipeTransform {
  transform(value: any, metadata: ArgumentMetadata) {
    if (typeof value === 'string') {
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
}