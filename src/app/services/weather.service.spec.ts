import { TestBed, ComponentFixture, async, fakeAsync, tick, inject } from '@angular/core/testing';
import { AppComponent } from '../app.component';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { WeatherService } from './weather.service';
import { FormsModule } from '@angular/forms';
import { HttpClient, HttpClientModule, HttpParams } from '@angular/common/http';

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
    describe('When the user inputs a new city ID', () => {
      it('Then, an HTTP request should be sent to online service', inject(
        [HttpClient, HttpTestingController],
        (http: HttpClient, httpMock: HttpTestingController) => {

          const miamiValidId = '4164138';
          const miamiUrl = 'http://api.openweathermap.org/data/2.5/weather';
          const urlParams = { id: weatherService.cityId.toString(),
            APPID: weatherService.apiKey.toString(),
            units: 'metric' };

          weatherService.setCity(miamiValidId);

          const req = httpMock.expectOne({
            url: miamiUrl + '?id=' + urlParams.id + '&APPID=' + urlParams.APPID + '&units=metric',
            method: 'GET',
          });

          expect(req.request.method).toEqual('GET');

          req.flush({ name: 'Miami' });
        }),
      );
    });
  });
});
