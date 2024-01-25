import { Client, ClientRepository, ClientUseCase } from "../../core";

export class ClientUseCaseImpl implements ClientUseCase {
  constructor(private readonly clientRepository: ClientRepository) {}

  async listClients(): Promise<Client[]> {
    return await this.clientRepository.findAll();
  }

  async getClientById(clientId: number): Promise<Client | null> {
    return await this.clientRepository.findById(clientId);
  }

  async createClient(clientData: Omit<Client, 'id'>): Promise<Client> {
    return await this.clientRepository.create(clientData);
  }

  async updateClient(clientId: number, clientData: Partial<Client>): Promise<Client | null> {
    return await this.clientRepository.update(clientId, clientData);
  }

  async deleteClient(clientId: number): Promise<boolean> {
    return await this.clientRepository.delete(clientId);
  }
}
