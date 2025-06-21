import { User } from "../../users/entities/user.entity";

export function isPremium(user: User): boolean {

  if (!user.premiumUntil) {
    return false;
  }

  const dateFin = new Date(user.premiumUntil);
  const maintenant = new Date(); 

  return dateFin > maintenant;
}
