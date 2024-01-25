import { Client, ClientCreate, ClientUpdate } from "../entities";

export interface ClientUseCase {
  listClients(): Promise<Client[]>;
  getClientById(clientId: number): Promise<Client | null>;
  createClient(clientData: ClientCreate): Promise<Client>;
  updateClient(clientId: number, clientData: ClientUpdate): Promise<Client | null>;
  deleteClient(clientId: number): Promise<boolean>;
}
