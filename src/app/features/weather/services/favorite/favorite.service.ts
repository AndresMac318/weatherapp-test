import { Injectable, signal } from '@angular/core';
import { Router } from '@angular/router';
import { WeatherHistoryItem } from '../../models/weather-current.model';

@Injectable({
  providedIn: 'root'
})
export class FavoriteService {

  private favoritesSignal = signal<WeatherHistoryItem[]>([]);
  
  constructor(private router: Router) {
    this.loadfavorites();
  }

  loadfavorites(){
    const historyData = localStorage.getItem('weather_history');
    if (historyData) {
      const parseData: WeatherHistoryItem[] = JSON.parse(historyData);
      const favoriteData = parseData.filter(item => item.favorite);
      this.favoritesSignal.set(favoriteData);
    }
  }

  get favorites() {
    return this.favoritesSignal.asReadonly();
  }

  goToUpdate(id: number) {
    this.router.navigate(['/weather/search', id]);
  }

  deleteFromFavorites(cityId: number){
    const updatedFavorites = this.favoritesSignal().filter(item => item.id !== cityId);
    this.favoritesSignal.set(updatedFavorites);
    this.saveFavorites(cityId);
  }

  private saveFavorites(cityId: number) {
    const allHistory = JSON.parse(localStorage.getItem('weather_history') || '[]');
    const updatedHistory = allHistory.map((item: WeatherHistoryItem) => 
      item.id === cityId ? { ...item, favorite: false } : item
    );
    localStorage.setItem('weather_history', JSON.stringify(updatedHistory));
    
  }

}
