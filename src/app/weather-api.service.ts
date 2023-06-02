import { HttpClient } from '@angular/common/http';
import { ErrorHandler, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { catchError, tap, switchMap } from 'rxjs/operators';
import { LocationApiService } from './location-api.service';
import { API_KEY } from './config';

@Injectable({
  providedIn: 'root',
})
export class WeatherAPIService {
  constructor(
    private http: HttpClient,
    private locationApiService: LocationApiService
  ) {}

  getWeatherData(input: string) {
    let lat: string, lon: string;

    return this.locationApiService.getLocationData(input).pipe(
      tap((response: any) => {
        ({ lat, lon } = response[0]);
      }),
      switchMap(() =>
        this.http.get(
          'https://api.openweathermap.org/data/2.5/weather?lat=' +
            lat +
            '&lon=' +
            lon +
            '&appid=' +
            API_KEY
        )
      ),
      catchError((error) => {
        throw error;
      })
    );
  }
}
