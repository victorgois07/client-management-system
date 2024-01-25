export class Client {
  constructor(
    public id: number,
    public name: string,
    public email: string,
    public phone: string,
  ) { }
}

export type ClientCreate = Omit<Client, 'id'>;
export type ClientUpdate = Partial<ClientCreate>;