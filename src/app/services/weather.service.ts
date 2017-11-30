import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import 'rxjs/add/operator/map';


@Injectable()
export class WeatherService {

  apiKey: String = '5eb804daafdf06e0b7045f443ecf9e2a';
  cityId: String = '3674962';

  constructor(private http: HttpClient) { }

  getCityWeather() {
    const urlParams = { id: this.cityId.toString(),
      APPID: this.apiKey.toString(),
      units: 'metric' };
    return this.http.get('http://api.openweathermap.org/data/2.5/weather', { params: urlParams })
      .map((response: any) => {
        return response;
      });
  }

  setCity(newCityId: String) {
    this.cityId = newCityId;
  }

}
