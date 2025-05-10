import { ExecutionContext, Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  canActivate(context: ExecutionContext) {
    const request = context.switchToHttp().getRequest();
    console.log('Authorization Header:', request.headers.authorization); // Afficher l'en-tête
    return super.canActivate(context); // Appelle la logique de validation de Passport
  }
}
