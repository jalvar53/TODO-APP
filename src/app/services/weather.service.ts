import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';
import { Weather } from '../model/weather.model';
import { environment } from '../../environments/environment';


@Injectable()
export class WeatherService {

  constructor(private http: HttpClient) { }

  fetchCityWeather(cityName : string): Observable<Weather> {
    const urlParams = {
      q: cityName,
      APPID: environment.apiKey,
      units: 'metric',
    };
    return this.http.get(environment.apiUrl, { params: urlParams })
      .map((response: any) => {
        const weatherData = new Weather(response);
        return weatherData;
      });
  }

}
