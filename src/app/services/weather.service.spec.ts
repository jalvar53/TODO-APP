import { TestBed, ComponentFixture, async, fakeAsync, tick } from '@angular/core/testing';
import { AppComponent } from '../app.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { WeatherService } from './weather.service';
import { FormsModule } from '@angular/forms';

describe('Weather service works correctly', () => {

  let weatherService: WeatherService;
  let component: AppComponent;
  let componentFixture: ComponentFixture<AppComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AppComponent],
      imports: [FormsModule, HttpClientTestingModule],
      providers: [WeatherService],
    });
    componentFixture = TestBed.createComponent(AppComponent);
    component = componentFixture.componentInstance;
    weatherService = componentFixture.debugElement.injector.get(WeatherService);
    componentFixture.detectChanges();
  });

  describe('Given a text input', () => {
    describe('When the user enters a new valid city ID', () => {
      it('Then, the service should receive a JSON with the correct information', fakeAsync(() => {
        componentFixture.detectChanges();
        const miamiValidId = '4164138';
        component.setNewCityId(miamiValidId);
        component.getCityWeatherAsync();
        tick();
        componentFixture.detectChanges();
      }));
    });
  });
});
