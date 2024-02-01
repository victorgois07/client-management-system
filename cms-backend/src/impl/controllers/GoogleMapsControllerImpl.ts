import { ClientUseCase, GetAutocompletePlaces, GetDirectionParams, GoogleMapsService } from 'src/core';
import { Body, Controller, Get, Post, Query, Route, Tags } from 'tsoa';
import { ClientRepositoryImpl } from '../repositories';
import { GoogleMapsServiceImpl } from '../services';
import { ClientUseCaseImpl } from '../useCases';

@Route('google-maps')
@Tags('Google-maps')
export class GoogleMapsController extends Controller {
  googleMapsService: GoogleMapsService;
  clientUseCase: ClientUseCase;

  constructor() {
    super();
    this.googleMapsService = new GoogleMapsServiceImpl();
    const clientRepositoryImpl = new ClientRepositoryImpl();
    this.clientUseCase = new ClientUseCaseImpl(clientRepositoryImpl);
  }

  @Get('get-autocomplete-places')
  public async getAutocomplete(@Query() input: string): Promise<GetAutocompletePlaces[]> {
    return await this.googleMapsService.getAutocompletePlaces(input);
  }

  @Post('post-calc-routes')
  public async calcRoutes(@Body() body: GetDirectionParams['origin']) {
    const clients = await this.clientUseCase.listClientsWithFilters({});
    return await this.googleMapsService.calcRoutes(body, clients);
  }
}
