import apiClient from '../utils/apiClient';
import { Client, ClientCreate, ClientUpdate } from './entities';

export const fetchClients = async () => {
  const response = await apiClient.get<Client[]>('/clients');
  return response;
};

export const createClient = async (data: ClientCreate) => {
  const response = await apiClient.post<Client>('/clients', data);
  return response;
};

export const updateUser = async (id: number, data: ClientUpdate) => {
  const response = await apiClient.put<Client>(`/clients/${id}`, data);
  return response;
};

export const deleteUser = async (id: number) => {
  const response = await apiClient.delete<{}>(`/clients/${id}`);
  return response;
};
