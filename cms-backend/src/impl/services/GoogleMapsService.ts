import googleMaps from '@google/maps';
import { CalcRoutesMap, CalcRoutesReponse, Client, GetAutocompletePlaces, GetDirectionParams, GoogleMapsService } from 'src/core';

export class GoogleMapsServiceImpl implements GoogleMapsService {
  private googleMapsClient: googleMaps.GoogleMapsClientWithPromise;

  constructor() {
    this.googleMapsClient = googleMaps.createClient({
      key: process.env.GOOGLE_API ?? '',
      Promise: Promise,
    });
  }

  private async getDirections({ origin, destination }: GetDirectionParams): Promise<googleMaps.DirectionsResponse> {
    const response = await this.googleMapsClient
      .directions({
        origin,
        destination,
        mode: 'driving',
        departure_time: new Date(),
        traffic_model: 'best_guess',
      })
      .asPromise();
    return response.json;
  }

  private async mapSortCalcRoutes(origin: GetDirectionParams['origin'], clients: Client[]): Promise<CalcRoutesMap[]> {
    const restItemRoutes = [];

    for (const client of clients) {
      const destination = {
        lat: client?.latitude ?? 0,
        lng: client?.longitude ?? 0,
      };

      const response = await this.getDirections({ origin, destination });

      const durationValue = response.routes[0].legs[0].duration.value;
      const distanceValue = response.routes[0].legs[0].distance.value;
      const durationText = response.routes[0].legs[0].duration.text;
      const distanceText = response.routes[0].legs[0].distance.text;

      restItemRoutes.push({
        clientId: client.id,
        lat: client?.latitude ?? 0,
        lng: client?.longitude ?? 0,
        durationValue,
        distanceValue,
        durationText,
        distanceText,
      });
    }

    const sortMap = (a: any, b: any) => a.durationValue - b.durationValue && a.distanceValue - b.distanceValue;

    return restItemRoutes.sort(sortMap);
  }

  async calcRoutes(origin: GetDirectionParams['origin'], clients: Client[]): Promise<CalcRoutesReponse[]> {
    const clientsWithRoutes = await this.mapSortCalcRoutes(origin, clients);
    const calcOptimizedRoutes = await this.calcOptimizedRoutes(clientsWithRoutes);
    return calcOptimizedRoutes;
  }

  private async calcOptimizedRoutes(clients: CalcRoutesMap[]): Promise<CalcRoutesMap[]> {
    let optimizedRoutes: CalcRoutesMap[] = [];
    let remainingClients = [...clients];

    while (remainingClients.length > 0) {
      let currentClient = remainingClients.shift();

      if (currentClient !== undefined) {
        optimizedRoutes.push(currentClient);

        if (remainingClients.length > 0) {
          let closestIndex = this.findClosestClientIndex(currentClient, remainingClients);
          if (closestIndex !== undefined) {
            let closestClient = remainingClients.splice(closestIndex, 1)[0];
            remainingClients.unshift(closestClient);
          }
        }
      }
    }

    return optimizedRoutes;
  }

  private findClosestClientIndex(currentClient: CalcRoutesMap, clients: CalcRoutesMap[]): number {
    let closestIndex = 0;
    let smallestDistance = Number.MAX_SAFE_INTEGER;

    clients.forEach((client, index) => {
      let distance = this.calculateDistance(currentClient, client);

      if (distance < smallestDistance) {
        closestIndex = index;
        smallestDistance = distance;
      }
    });

    return closestIndex;
  }

  private calculateDistance(clientA: CalcRoutesMap, clientB: CalcRoutesMap): number {
    return Math.sqrt(Math.pow(clientB.durationValue - clientA.durationValue, 2) + Math.pow(clientB.distanceValue - clientA.distanceValue, 2));
  }

  async getPlaceId(placeid: string): Promise<googleMaps.PlaceDetailsResponse> {
    const response = await this.googleMapsClient
      .place({
        placeid,
        fields: ['geometry'],
      })
      .asPromise();
    return response.json;
  }

  async getAutocompletePlaces(input: string): Promise<GetAutocompletePlaces[]> {
    try {
      const response = await this.googleMapsClient
        .placesAutoComplete({
          input,
        })
        .asPromise();

      if (!response.json?.predictions && !response.json.predictions.length) {
        return [];
      }

      const mapData = await Promise.all(
        response.json.predictions.map(async (prediction) => {
          const placeId = await this.getPlaceId(prediction.place_id);

          return {
            name: prediction.structured_formatting.main_text,
            description: prediction.structured_formatting.secondary_text,
            id: prediction.place_id,
            lat: placeId.result.geometry.location.lat,
            lng: placeId.result.geometry.location.lng,
          };
        }),
      );

      return mapData;
    } catch (err) {
      return [];
    }
  }
}
