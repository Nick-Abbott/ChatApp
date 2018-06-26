export enum Permission {
  GUEST,
  MEMBER,
  ADMIN,
}

export class Room {
  private CAPACITY: number;
  private MULTIPLY: boolean;
  private PERMISSION: Permission;

  constructor(capacity: number, multiply: boolean, permission: 'GUEST' | 'MEMBER' | 'ADMIN') {
    this.CAPACITY = capacity;
    this.MULTIPLY = multiply;
    this.PERMISSION = Permission[permission];
  }

  public get capacity() {
    return this.CAPACITY;
  }

  public get multiply() {
    return this.MULTIPLY;
  }

  public get permission() {
    return this.PERMISSION;
  }
}
