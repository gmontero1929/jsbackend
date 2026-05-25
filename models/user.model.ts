/*export interface User {
  id?: string;
  usuario: string;
  email: string;
  password: string;
  rol?: number;
  createdAt?: Date;
}*/

export class User {
  constructor(
    public id: string,
    public usuario: string,
    public email: string,
    public password: string,
    public rol: number,
    public createdAt?: Date,
  ) {}
}