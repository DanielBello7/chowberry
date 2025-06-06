import { ACCOUNT_ROLES_ENUM } from '@app/enums';
import { SetMetadata } from '@nestjs/common';

export const ROLES_KEY = 'ROLES';
export const AllowRoles = (...roles: ACCOUNT_ROLES_ENUM[]) => SetMetadata(ROLES_KEY, roles);
