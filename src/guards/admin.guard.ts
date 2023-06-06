import { CanActivate, ExecutionContext } from '@nestjs/common';
import { Observable } from 'rxjs';
export class AdminGuard implements CanActivate {
  canActivate(context: ExecutionContext) {
    const request = context.switchToHttp().getRequest();
    if (!request.currentUser) {
      console.log('admin guard, no use found');
      return false;
    }
    console.log('admin guard', request.currentUser);
    return request.currentUser.admin;
  }
}
