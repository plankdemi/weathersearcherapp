import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { API_KEY } from './config';

@Injectable({
  providedIn: 'root'
})
export class LocationApiService {

  constructor(private http: HttpClient) { }
  getLocationData(cityName:string){
    return this.http.get(
      'http://api.openweathermap.org/geo/1.0/direct?q='+ cityName +'&appid='+ API_KEY
    );
  }
}
