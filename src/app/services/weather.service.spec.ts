import { TestBed, ComponentFixture, async, fakeAsync, tick, inject } from '@angular/core/testing';
import { AppComponent } from '../app.component';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { WeatherService } from './weather.service';
import { FormsModule } from '@angular/forms';
import { HttpClient, HttpClientModule, HttpParams } from '@angular/common/http';
import { environment } from '../../environments/environment.prod';

describe('Weather service works correctly', () => {

  let weatherService: WeatherService;
  let component: AppComponent;
  let componentFixture: ComponentFixture<AppComponent>;
  const apiKey = '5eb804daafdf06e0b7045f443ecf9e2a';

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [AppComponent],
      imports: [FormsModule, HttpClientModule, HttpClientTestingModule],
      providers: [WeatherService],
    });
    componentFixture = TestBed.createComponent(AppComponent);
    component = componentFixture.componentInstance;
    weatherService = componentFixture.debugElement.injector.get(WeatherService);
    componentFixture.detectChanges();
  }));

  afterEach(inject([HttpTestingController], (httpMock: HttpTestingController) => {
    httpMock.verify();
  }));

  describe('Given a text input', () => {
    describe('When the user inputs a new city name', () => {
      xit('Then, an HTTP request should be sent to online service', inject(
        [HttpClient, HttpTestingController],
        (http: HttpClient, httpMock: HttpTestingController) => {

          const miamiValidName = 'Miami';
          const urlParams = { name: weatherService.cityName,
            APPID: environment.apiKey,
            units: 'metric' };

          const params = '?q=' + encodeURIComponent(urlParams.name) +
           '&APPID=' + urlParams.APPID + '&units=metric';

          weatherService.setCity(miamiValidName);

          const req = httpMock.expectOne({
            url: environment.apiUrl + params,
            method: 'GET',
          });

          expect(req.request.method).toEqual('GET');

          req.flush({ name: 'Miami' });
        },
      ));
    });
  });
});
