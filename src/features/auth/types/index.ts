export enum Role {
  Administrator = 'Administrator',
  Supplier = 'Provider',
  Manager = 'Manager',
  Mechanic = 'Mechanic',
}

export interface AuthUser {
  userId: string
  identityNumber: string
  roleName: Role
  roleId: string
}

export interface AuthResponse extends AuthUser {
  token: string
  refreshToken: string
}
