import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SearchComponent } from './search.component';
import { WeatherService } from '../../services/weather/weather.service';
import { ReactiveFormsModule } from '@angular/forms';
import { of } from 'rxjs';
import { TranslateModule } from '@ngx-translate/core';

describe('SearchComponent', () => {
  let component: SearchComponent;
  let fixture: ComponentFixture<SearchComponent>;
  let weatherServiceSpy: jasmine.SpyObj<WeatherService>;

  beforeEach(() => {
    const weatherServiceMock = jasmine.createSpyObj('WeatherService', ['searchCity']);
    weatherServiceMock.searchCity.and.returnValue(of([]));

    TestBed.configureTestingModule({
      imports: [
        SearchComponent,
        ReactiveFormsModule,
        TranslateModule.forRoot()
      ],
      providers: [
        { provide: WeatherService, useValue: weatherServiceMock }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(SearchComponent);
    component = fixture.componentInstance;
    weatherServiceSpy = TestBed.inject(WeatherService) as jasmine.SpyObj<WeatherService>;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should inject WeatherService correctly', () => {
    expect(weatherServiceSpy).toBeTruthy();
  });
});
