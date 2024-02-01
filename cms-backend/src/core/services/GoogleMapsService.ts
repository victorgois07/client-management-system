import { PlaceDetailsResponse } from '@google/maps';
import { Client } from '../entities';

export type GetAutocompletePlaces = {
  name: string;
  description: string;
  id: string;
  lat: number;
  lng: number;
};

export type GetDirectionParams = {
  origin: {
    lat: number;
    lng: number;
  };
  destination: {
    lat: number;
    lng: number;
  };
};

export type CalcRoutesReponse = {
  clientId: number;
  lat: number;
  lng: number;
};

export type CalcRoutesMap = {
  clientId: number;
  lat: number;
  lng: number;
  durationValue: number;
  distanceValue: number;
  durationText: string;
  distanceText: string;
};

export type GoogleMapsService = {
  getAutocompletePlaces: (input: string) => Promise<GetAutocompletePlaces[]>;
  getPlaceId(placeid: string): Promise<PlaceDetailsResponse>;
  calcRoutes(origin: GetDirectionParams['origin'], clients: Client[]): Promise<CalcRoutesReponse[]>;
};
