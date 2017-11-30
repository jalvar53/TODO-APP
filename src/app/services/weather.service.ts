import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';
import { Weather } from '../model/weather.model';
import { environment } from '../../environments/environment';


@Injectable()
export class WeatherService {

  cityName: string = 'Rio de Janeiro';

  constructor(private http: HttpClient) { }

  fetchCityWeather(): Observable<any> {
    const urlParams = { q: this.cityName,
      APPID: environment.apiKey,
      units: 'metric' };
    return this.http.get('http://api.openweathermap.org/data/2.5/weather', { params: urlParams })
      .map((response: Object) => {
          const weatherData = new Weather(response);
          return weatherData;
      });
  }

  setCity(newCity: string): void {
    this.cityName = newCity;
  }

}
