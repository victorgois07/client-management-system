import { PrismaClient } from '@prisma/client';
import { Client } from '../../core/entities/Client';
import { ClientRepository } from '../../core/repositories/ClientRepository';

export class ClientRepositoryImpl implements ClientRepository {
  private prisma: PrismaClient;

  constructor() {
    this.prisma = new PrismaClient();
  }

  async findByFilters(filters: Partial<Client>): Promise<Client[]> {
    try {
      const clients = await this.prisma.client.findMany({
        where: {
          name: filters.name,
          email: filters.email,
          phone: filters.phone,
          latitude: filters.latitude,
          longitude: filters.longitude,
        },
      });
      return clients.map((client) => ({
        id: client.id,
        name: client.name,
        email: client.email,
        phone: client.phone,
        latitude: client?.latitude ?? undefined,
        longitude: client?.longitude ?? undefined,
      }));
    } catch (err) {
      throw new Error('Error finding clients');
    }
  }

  async findById(id: number): Promise<Client | null> {
    try {
      const client = await this.prisma.client.findUnique({
        where: { id },
      });
      if (!client) return null;

      return {
        id: client.id,
        name: client.name,
        email: client.email,
        phone: client.phone,
        latitude: client?.latitude ?? undefined,
        longitude: client?.longitude ?? undefined,
      };
    } catch (err) {
      throw new Error('Error finding client');
    }
  }

  async create(clientData: Client): Promise<Client> {
    try {
      const createdClient = await this.prisma.client.create({
        data: {
          name: clientData.name,
          email: clientData.email,
          phone: clientData.phone,
          latitude: clientData?.latitude,
          longitude: clientData?.longitude,
        },
      });

      return {
        id: createdClient.id,
        name: createdClient.name,
        email: createdClient.email,
        phone: createdClient.phone,
        latitude: createdClient?.latitude ?? undefined,
        longitude: createdClient?.longitude ?? undefined,
      };
    } catch (err) {
      throw new Error('Error creating client');
    }
  }

  async update(id: number, clientData: Client): Promise<Client | null> {
    try {
      const updatedClient = await this.prisma.client.update({
        where: { id },
        data: {
          name: clientData.name,
          email: clientData.email,
          phone: clientData.phone,
          latitude: clientData?.latitude ?? undefined,
          longitude: clientData?.longitude ?? undefined,
        },
      });

      if (!updatedClient) return null;

      return {
        id: updatedClient.id,
        name: updatedClient.name,
        email: updatedClient.email,
        phone: updatedClient.phone,
        latitude: updatedClient?.latitude ?? undefined,
        longitude: updatedClient?.longitude ?? undefined,
      };
    } catch (err) {
      throw new Error('Error updating client');
    }
  }

  async delete(id: number): Promise<boolean> {
    try {
      const deletedClient = await this.prisma.client.delete({
        where: { id },
      });

      return !!deletedClient;
    } catch (err) {
      throw new Error('Error deleting client');
    }
  }
}
