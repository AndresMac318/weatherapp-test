import { ChangeDetectionStrategy, Component, inject, OnDestroy, OnInit, signal } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';

import { TranslatePipe } from '@ngx-translate/core';

import { debounceTime, distinctUntilChanged, Subject, switchMap, takeUntil } from 'rxjs';

import { WeatherSearch } from '../../models/weather-search.model';
import { WeatherService } from '../../services/weather/weather.service';

@Component({
  selector: 'app-search',
  standalone: true,
  imports: [
    ReactiveFormsModule, 
    RouterLink,
    TranslatePipe
  ],
  template: `
    <section class="search">
      <h2 class="search__title">{{ 'WEATHER.FORM.title' | translate }}</h2>
      <div class="search__control">
        <input
        [formControl]="searchControl"
        name="city_name"
        class="search__input"
        type="text"
        [placeholder]="'WEATHER.FORM.input_placeholder' | translate" />

      </div>

      @if (isLoading()) {
        <div class="loading">{{ "WEATHER.FORM.loading_text" | translate }}</div>
      }

      @if (cities().length > 0) {
        <ul class="search__citieslist">
          @for (city of cities(); track city.id) {
            <li class="search__cityitem">
              <div class="search__cityitem--info">
                <strong>{{ city.name }}</strong>
                <span>{{ city.region }}, {{ city.country }}</span>
              </div>
              <a 
              [routerLink]="['/weather/search/', city.id]"
              class="search__cityitem--btn">
                <i>
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="#8750F7" d="M15.5 14h-.79l-.28-.27A6.47 6.47 0 0 0 16 9.5A6.5 6.5 0 1 0 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5S14 7.01 14 9.5S11.99 14 9.5 14"/></svg>
                </i>
              </a>
            </li>
          }
        </ul>
      } @else if (!isLoading() && searchPerformed()) {
        <div class="search__noresults">
        {{ "WEATHER.text_not_found" | translate }}
        </div>
      }
      
    </section>

  `,
  styleUrl: './search.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SearchComponent implements OnInit, OnDestroy {
  
  private weatherSvc = inject(WeatherService);
  private destroy$ = new Subject<void>();
  
  searchControl = new FormControl('');
  
  cities = signal<WeatherSearch[]>([]);
  isLoading = signal(false);
  searchPerformed = signal(false);
  
  ngOnInit(): void {
    this.setupSearchListener();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  private setupSearchListener(): void {
    this.searchControl.valueChanges.pipe(
      debounceTime(300),
      distinctUntilChanged(),
      switchMap(query => {
        this.isLoading.set(true);
        this.searchPerformed.set(true);
        return this.weatherSvc.searchCity(query || '');
      }),
      takeUntil(this.destroy$)
    ).subscribe({
      next: (results) => {
        this.cities.set(results);
        this.isLoading.set(false);
      },
      error: (err) => {
        console.error('Error searching cities:', err);
        this.isLoading.set(false);
        this.cities.set([]);
      }
    });
  }
}
