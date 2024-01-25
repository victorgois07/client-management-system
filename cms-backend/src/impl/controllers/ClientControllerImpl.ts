import { Body, Controller, Delete, Get, Path, Post, Put, Route, Tags } from 'tsoa';
import { Client, ClientCreate, ClientUpdate, ClientUseCase } from '../../core';
import { ClientRepositoryImpl } from '../repositories';
import { ClientUseCaseImpl } from '../useCases';
import { ClientValidator } from '../validations';

@Route('clients')
@Tags('Clients')
export class ClientController extends Controller {
  private clientUseCase: ClientUseCase;

  constructor() {
    super();
    const clientRepository = new ClientRepositoryImpl();
    this.clientUseCase = new ClientUseCaseImpl(clientRepository);
  }
  /**
   * Listar todos os clientes.
   * @returns Lista de clientes.
   */
  @Get()
  public async listClients(): Promise<Client[]> {
    try {
      const clients = await this.clientUseCase.listClients();
      this.setStatus(200);
      return clients;
    } catch (error) {
      this.setStatus(500);
      throw error;
    }
  }

  /**
   * Criar um novo cliente.
   * @param requestBody - Dados do cliente a ser criado.
   * @returns O cliente criado.
   */
  @Post()
  public async createClient(@Body() requestBody: ClientCreate): Promise<Client> {
    try {
      await ClientValidator.validateCreateClient(requestBody);
      try {
        const createdClient = await this.clientUseCase.createClient(requestBody);
        this.setStatus(201);
        return createdClient;
      } catch (err) {
        this.setStatus(500);
        throw err;
      }
    } catch (error) {
      this.setStatus(400);
      throw error;
    }
  }

  /**
   * Obter detalhes de um cliente pelo ID.
   * @param clientId - ID do cliente a ser obtido.
   * @returns Detalhes do cliente.
   */
  @Get('{clientId}')
  public async getClient(@Path() clientId: number): Promise<Client> {
    try {
      const client = await this.clientUseCase.getClientById(clientId);
      if (client) {
        this.setStatus(200);
        return client;
      } else {
        this.setStatus(404);
        throw new Error('Cliente não encontrado');
      }
    } catch (error) {
      this.setStatus(500);
      throw error;
    }
  }

  /**
   * Atualizar um cliente existente.
   * @param clientId - ID do cliente a ser atualizado.
   * @param requestBody - Novos dados do cliente.
   * @returns O cliente atualizado.
   */
  @Put('{clientId}')
  public async updateClient(@Path() clientId: number, @Body() requestBody: ClientUpdate): Promise<Client> {
    try {
      await ClientValidator.validateUpdateClient(requestBody);

      const updatedClient = await this.clientUseCase.updateClient(clientId, requestBody);

      if (updatedClient) {
        this.setStatus(200);
        return updatedClient;
      } else {
        this.setStatus(404);
        throw new Error('Cliente não encontrado');
      }
    } catch (error) {
      this.setStatus(400);
      throw error;
    }
  }

  /**
   * Excluir um cliente pelo ID.
   * @param clientId - ID do cliente a ser excluído.
   */
  @Delete('{clientId}')
  public async deleteClient(@Path() clientId: number): Promise<void> {
    try {
      const deleted = await this.clientUseCase.deleteClient(clientId);
      if (deleted) {
        this.setStatus(204);
      } else {
        this.setStatus(404);
        throw new Error('Cliente não encontrado');
      }
    } catch (error) {
      this.setStatus(500);
      throw error;
    }
  }
}
