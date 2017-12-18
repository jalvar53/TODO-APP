export class Weather {

  id: string;
  city: string;
  lat: string;
  lon: string;
  windSpeed: string;
  cloudiness: string;
  pressure: number;
  humidity: string;
  temp: string;

  constructor(response: any) {
    this.id = response.id;
    this.city = response.name;
    this.lat = response.coord.lat;
    this.lon = response.coord.lon;
    this.windSpeed = response.wind.speed;
    this.cloudiness = response.weather[0].description;
    this.pressure = response.main.pressure;
    this.humidity = response.main.humidity;
    this.temp = response.main.temp;
  }
}
