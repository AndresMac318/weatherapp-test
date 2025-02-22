import { ChangeDetectionStrategy, Component, inject, input, OnInit, signal } from '@angular/core';
import { WeatherService } from '../../services/weather/weather.service';
import { WeatherCurrent, WeatherCurrentMinimal } from '../../models/weather-current.model';
import { catchError, of } from 'rxjs';
import { CommonModule, DatePipe, Location } from '@angular/common';
import { TranslatePipe } from '@ngx-translate/core';

@Component({
  selector: 'app-search-detail',
  standalone: true,
  imports: [CommonModule, DatePipe, TranslatePipe ],
  template: `
    <section class="searchdetail">
      <div *ngIf="cityDetail() as city" class="searchdetail__container">
        <div class="searchdetail__btnprev">
          <button class="searchdetail__btn" (click)="prevNavigation()">
            <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24"><path fill="#8750f7" d="M20 11H7.83l5.59-5.59L12 4l-8 8l8 8l1.41-1.41L7.83 13H20z"/></svg>
            <a>{{ "SEARCH.button_back" | translate }}</a>
          </button>
        </div>
        <h2 class="searchdetail__title" >{{ city.location.name }}</h2>
        <div class="searchdetail__img">
          <img
          [src]="'https:'+city.current.condition.icon" 
          alt="icon" srcset="" 
          height="100px" width="100px" >
          <span class="searchdetail__state" >{{ city.current.condition.text }}</span>
        </div>
        <div class="searchdetail__content">
          <div class="searchdetail__info">
            <h3 class="searchdetail__temperature">{{ city.current.temp_c }} °C</h3>
            <span class="searchdetail__temperature">{{ city.current.temp_f }} °F</span>
          </div>
          <div class="searchdetail__additional">
            <span class="searchdetail__title">{{ "SEARCH.INFO.subtitle" | translate }}</span>
            <span class="searchdetail__additionaltext">{{ "SEARCH.INFO.item1" | translate }} {{ city.current.wind_kph }}km/h</span>
            <span class="searchdetail__additionaltext">{{ "SEARCH.INFO.item2" | translate }} {{ city.current.humidity }}%</span>
            <span class="searchdetail__additionaltext">{{ "SEARCH.INFO.item3" | translate }} {{ city.location.localtime | date:'shortTime'}}</span>
          </div>
        </div>
        <span class="searchdetail__temperature"></span>
        
      </div>
    </section>
  `,
  styleUrl: './search-detail.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SearchDetailComponent implements OnInit {
  
  id = input(0);
  cityDetail = signal<WeatherCurrentMinimal | null>(null);
  loading = signal(true);
  error = signal<string | null>(null);

  private router = inject(Location);
  private weatherSvc = inject(WeatherService);

  ngOnInit(): void {
    console.log(this.id());
    this.weatherSvc.getCityCurrent(this.id())
    .pipe(
      catchError(err =>{
        console.log('Error in charge city details', err);
        this.error.set('Error in charge information, try later');
        return of(null);
      })
    ).subscribe(data => {
      this.cityDetail.set(data);
      this.loading.set(false);
    });
  }

  prevNavigation(){
    this.router.back();
  }

}
