import { PrismaClient } from '@prisma/client';
import { Client } from '../../core/entities/Client';
import { ClientRepository } from '../../core/repositories/ClientRepository';

export class ClientRepositoryImpl implements ClientRepository {
  private prisma: PrismaClient;

  constructor() {
    this.prisma = new PrismaClient();
  }

  async findAll(): Promise<Client[]> {
    const clients = await this.prisma.client.findMany();
    return clients.map((client) => ({
      id: client.id,
      name: client.name,
      email: client.email,
      phone: client.phone,
    }));
  }

  async findById(id: number): Promise<Client | null> {
    const client = await this.prisma.client.findUnique({
      where: { id },
    });
    if (!client) return null;

    return {
      id: client.id,
      name: client.name,
      email: client.email,
      phone: client.phone,
    };
  }

  async create(clientData: Client): Promise<Client> {
    const createdClient = await this.prisma.client.create({
      data: {
        name: clientData.name,
        email: clientData.email,
        phone: clientData.phone,
      },
    });

    return {
      id: createdClient.id,
      name: createdClient.name,
      email: createdClient.email,
      phone: createdClient.phone,
    };
  }

  async update(id: number, clientData: Client): Promise<Client | null> {
    const updatedClient = await this.prisma.client.update({
      where: { id },
      data: {
        name: clientData.name,
        email: clientData.email,
        phone: clientData.phone,
      },
    });

    if (!updatedClient) return null;

    return {
      id: updatedClient.id,
      name: updatedClient.name,
      email: updatedClient.email,
      phone: updatedClient.phone,
    };
  }

  async delete(id: number): Promise<boolean> {
    const deletedClient = await this.prisma.client.delete({
      where: { id },
    });

    return !!deletedClient;
  }
}
