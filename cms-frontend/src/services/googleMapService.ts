import apiClient from '../utils/apiClient';
import { GetAutocompletePlaces } from './entities';

export const getAutocompletePlaces = async (input: string) => {
  const response = await apiClient.get<GetAutocompletePlaces[]>(
    `/google-maps/get-autocomplete-places?input=${encodeURIComponent(input)}`
  );
  return response;
};
