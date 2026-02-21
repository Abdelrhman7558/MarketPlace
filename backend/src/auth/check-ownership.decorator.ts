import { SetMetadata } from '@nestjs/common';

export const CheckOwnership = (resource: 'PRODUCT' | 'ORDER') => SetMetadata('checkOwnership', resource);
