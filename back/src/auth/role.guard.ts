import { Injectable, CanActivate, ExecutionContext, ForbiddenException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { JwtAuthGuard } from './jwt-auth.guard';
import { Role } from './role.enum';


@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const roles = this.reflector.get<Role[]>('roles', context.getHandler()); // Récupère les rôles depuis le décorateur
    if (!roles) {
      return true; // Si aucun rôle n'est spécifié, tout le monde peut accéder
    }

    const request = context.switchToHttp().getRequest();
    const user = request.user; // L'utilisateur est ajouté dans la requête par le JwtAuthGuard

    if (!user) {
      throw new ForbiddenException('Accès interdit');
    }

    // Vérifie si l'utilisateur possède un des rôles requis
    const hasRole = roles.some(role => user.roles?.includes(role)); // On compare le rôle de l'utilisateur
    if (!hasRole) {
      throw new ForbiddenException('Accès interdit');
    }

    return true;
  }
}
