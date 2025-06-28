export function isOwnerOrAdmin(
  resourceOwnerId: number,
  userId: number,
  userRole: string,
): boolean {
  return resourceOwnerId === userId || userRole === 'ADMIN';
}
