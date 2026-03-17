import {
  createParamDecorator,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common';
import { AccessTokenPayloadType } from 'src/domain/schemas/token';

export const ActiveUserId = createParamDecorator<undefined>(
  (data, context: ExecutionContext) => {
    const request = context
      .switchToHttp()
      .getRequest<Request & { user: AccessTokenPayloadType }>();
    const userId = request.user?.sub;

    if (!userId) {
      throw new UnauthorizedException();
    }

    return userId;
  },
);
