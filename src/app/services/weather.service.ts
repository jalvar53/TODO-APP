import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import 'rxjs/add/operator/map';


@Injectable()
export class WeatherService {

  apiKey: String = '5eb804daafdf06e0b7045f443ecf9e2a';
  cityId: String = '3674962';

  constructor(private http: HttpClient) { }

  getCityWeather() {
    return this.http.get('http://api.openweathermap.org/data/2.5/weather?id=' +
      this.cityId + '&APPID=' + this.apiKey + '&units=metric')
      .map((response) => {
        return response;
      });
  }

  setCity(newCityId: String) {
    this.cityId = newCityId;
  }

}
