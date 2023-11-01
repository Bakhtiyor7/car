import { ExecutionContext, createParamDecorator } from '@nestjs/common';

//data: never means it doesn't have to return any data
export const CurrentUser = createParamDecorator(
  (data: never, context: ExecutionContext) => {
    const request = context.switchToHttp().getRequest();
    return request.currentUser;
  },
);
