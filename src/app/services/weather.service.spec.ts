import { TestBed, ComponentFixture, async, fakeAsync, tick, inject } from '@angular/core/testing';
import { AppComponent } from '../app.component';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { WeatherService } from './weather.service';
import { FormsModule } from '@angular/forms';
import { HttpClient, HttpClientModule, HttpParams } from '@angular/common/http';
import { environment } from '../../environments/environment.prod';
import { Weather } from '../model/weather.model';

describe('Weather service works correctly', () => {

  let weatherService: WeatherService;
  let component: AppComponent;
  let componentFixture: ComponentFixture<AppComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [AppComponent],
      imports: [FormsModule, HttpClientModule, HttpClientTestingModule],
      providers: [WeatherService],
    });
    componentFixture = TestBed.createComponent(AppComponent);
    component = componentFixture.componentInstance;
    weatherService = componentFixture.debugElement.injector.get(WeatherService);
    component.weatherInformation = new Weather({
      coord: {
        lon: 145.77,
        lat: -16.92,
      },
      weather:[{
        main: 'Sunny',
        description: 'Clear',
      }],
      main:{
        temp: 300.25,
        pressure: 1019,
        humidity: 83,
      },
      wind:{
        speed: 1.1,
      },
      id: '3451190',
      name:'Rio de Janeiro',
    });
    componentFixture.detectChanges();
  }));

  afterEach(inject([HttpTestingController], (httpMock: HttpTestingController) => {
    httpMock.verify();
  }));

  describe('Given a text input', () => {
    describe('When the user inputs a new city name', () => {
      it('Then, an HTTP request should be sent to online service', inject(
        [HttpClient, HttpTestingController],
        (http: HttpClient, httpMock: HttpTestingController) => {

          const urlParams = { name: component.weatherInformation.city,
            APPID: environment.apiKey,
            units: 'metric' };

          const params = '?q=' + encodeURIComponent(urlParams.name) +
           '&APPID=' + urlParams.APPID + '&units=metric';

          const req = httpMock.expectOne({
            url: environment.apiUrl + params,
            method: 'GET',
          });

          expect(req.request.method).toEqual('GET');

          req.flush({
            coord: {
              lon: 145.77,
              lat: -16.92,
            },
            weather:[{
              main: 'Clouds',
              description: 'broken clouds',
            }],
            main:{
              temp: 293.25,
              pressure: 1019,
              humidity: 83,
            },
            wind:{
              speed: 5.1,
            },
            id: '2172797',
            name:'Cairns',
          });
        },
      ));
    });
  });
});
