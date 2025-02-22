import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable, of, shareReplay, tap } from 'rxjs';
import { WeatherSearch } from '../../models/weather-search.model';
import { WeatherCurrent, WeatherCurrentMinimal, WeatherHistoryItem } from '../../models/weather-current.model';
import { HistoryService } from '../history/history.service';
import { environment } from '../../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class WeatherService {

  private API_URL = environment.API_URL;
  private API_KEY = environment.API_KEY;

  private searchCache = new Map<string, Observable<WeatherSearch[]>>();

  private detailsCache = new Map<string, Observable<WeatherCurrentMinimal>>();

  private readonly HISTORY_KEY = 'weather_history';

  constructor(private http: HttpClient, private historySvc: HistoryService) {}

  searchCity(city: string): Observable<WeatherSearch[]>{
    
    if (this.searchCache.has(city)) {
      return this.searchCache.get(city)!;
    }

    if(!city.trim()){
      return of([]);
    }

    // query params
    const params = new HttpParams()
      .set('key', this.API_KEY)
      .set('q', city);

    const request = this.http.get<WeatherSearch[]>(`${this.API_URL}/search.json`, {params})
      .pipe(
        shareReplay(1)
      );

    this.searchCache.set(city, request);

    return request;
  }

  getCityCurrent(cityId: number):Observable<WeatherCurrentMinimal>{
    
    const cacheKey = `id:${cityId}`;
    
    if (this.detailsCache.has(cacheKey)) {
      return this.detailsCache.get(cacheKey)!;
    }

    const params = new HttpParams()
      .set('key', this.API_KEY)
      .set('q', `id:${cityId}`);

    const request = this.http.get<WeatherCurrent>(`${this.API_URL}/current.json`, {params})
      .pipe(
        map((data) => ({
          location: {
            name: data.location.name,
            region: data.location.region,
            country: data.location.country,
            localtime: data.location.localtime,
          },
          current: {
            temp_c: data.current.temp_c,
            temp_f: data.current.temp_f,
            condition: {
              text: data.current.condition.text,
              icon: data.current.condition.icon,
              code: data.current.condition.code,
            },
            wind_kph: data.current.wind_kph,
            wind_mph: data.current.wind_mph,
            humidity: data.current.humidity,
          },
        })),
        tap(cityDetails => {
          this.saveToHistory(cityId, cityDetails);
        }),
        shareReplay(1)
      );

    this.detailsCache.set(cacheKey, request);

    return request;
  
  }

  saveToHistory(cityId: number, cityDetails: WeatherCurrentMinimal): void{
    const history = this.getHistory();
    const existingId = history.findIndex((item: WeatherHistoryItem) => item.id === cityId);

    if (existingId >= 0) {
      history[existingId] = { ...history[existingId], ...cityDetails};
    } else {
      history.push({...cityDetails, id: cityId, favorite: false})
    }
    localStorage.setItem(this.HISTORY_KEY, JSON.stringify(history));
    this.historySvc.loadHistory();
  }

  getHistory(){
    const storedHistory = localStorage.getItem(this.HISTORY_KEY);
    return storedHistory ? JSON.parse(storedHistory) : [];
  }

}
