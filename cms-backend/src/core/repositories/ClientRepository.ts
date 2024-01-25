import { Client, ClientCreate, ClientUpdate } from "../entities";


export interface ClientRepository {
  findAll(): Promise<Client[]>;
  findById(id: number): Promise<Client | null>;
  create(clientData: ClientCreate): Promise<Client>;
  update(id: number, clientData: ClientUpdate): Promise<Client | null>;
  delete(id: number): Promise<boolean>;
}
