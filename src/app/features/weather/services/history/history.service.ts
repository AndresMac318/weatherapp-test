import { Injectable, signal } from '@angular/core';
import { WeatherHistoryItem } from '../../models/weather-current.model';
import { Router } from '@angular/router';
import { FavoriteService } from '../favorite/favorite.service';

@Injectable({
  providedIn: 'root'
})
export class HistoryService {

  private historySignal = signal<WeatherHistoryItem[]>([]);

  constructor(private router: Router, private favoritesSvc: FavoriteService) {
    this.loadHistory();
  }

  loadHistory() {

    const historyData = localStorage.getItem('weather_history');
    if (historyData) {
      this.historySignal.set(JSON.parse(historyData));
    }
  }

  private saveHistory() {
    localStorage.setItem('weather_history', JSON.stringify(this.historySignal()));
  }

  get history() {
    return this.historySignal.asReadonly();
  }

  goToUpdate(id: number) {
    this.router.navigate(['/weather/search', id]);
  }

  addToFavorite(cityId: number){
    const updatedHistory = this.historySignal().map(item=>{
      if (item.id === cityId) {
        return {...item, favorite: !item.favorite};
      }
      return item;
    })
    this.historySignal.set(updatedHistory);
    this.saveHistory();
    this.favoritesSvc.loadfavorites();
  }

}
