import { Component } from '@angular/core';
import { WeatherAPIService } from './weather-api.service';
import { tap, catchError } from 'rxjs/operators';

@Component({
  selector: 'app-root',

  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  constructor(private weatherAPIService: WeatherAPIService) {}
  city: string = '';
  tempF: string = '';
  tempC: string = '';
  tempK: string = '';
  input: string = '';
  showTemp=false;

  fetchData(input: string): void {
    this.weatherAPIService
      .getWeatherData(input)
      .pipe(
        tap((response) => {
          this.showWeather(response);
          console.log(response);
        }),
        catchError((error) => {
          console.error(error);
          throw error;
        })
      )
      .subscribe();
  }

  showWeather(input: any) {
    this.city = input.name;
    this.tempK = Math.trunc(input.main.temp).toString();
    this.tempF = Math.trunc((((+input.main.temp)*9)/5)-459.67).toString();
    this.tempC = Math.trunc((+this.tempF - 32) * 0.5556).toString();
    this.showTemp = true;
  }
}
