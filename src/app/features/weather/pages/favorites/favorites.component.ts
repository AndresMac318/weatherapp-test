import { ChangeDetectionStrategy, Component, computed, inject, signal } from '@angular/core';
import { FavoriteService } from '../../services/favorite/favorite.service';
import { DatePipe } from '@angular/common';
import { TranslatePipe } from '@ngx-translate/core';

@Component({
  selector: 'app-favorites',
  standalone: true,
  imports: [DatePipe, TranslatePipe],
  template: `
    <div class="table-container">
      <h2 class="table-title">{{ "HISTORY/FAVORITES.title_favorites" | translate }}</h2>
      @if (favorites().length > 0) {
        <table>
          <thead>
            <tr>
              <th>{{ "HISTORY/FAVORITES.TABLE.column1" | translate }}</th>
              <th>{{ "HISTORY/FAVORITES.TABLE.column2" | translate }}</th>
              <th>{{ "HISTORY/FAVORITES.TABLE.column3" | translate }}</th>
              <th>{{ "HISTORY/FAVORITES.TABLE.column4" | translate }}</th>
              <th>{{ "HISTORY/FAVORITES.TABLE.column5" | translate }}</th>
            </tr>
          </thead>
          <tbody>
            @for (city of paginatedHistory(); track city.id) {
              <tr>
                <td>{{ city.location.name }}</td>
                <td>{{ city.current.temp_c }}°C</td>
                <td>{{ city.location.localtime | date:'shortTime'}}</td>
                <td>{{ city.location.country }}</td>
                <td>
                  <button class="button" (click)="viewDetail(city.id)">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="#FFFFFF" d="M17.01 14h-.8l-.27-.27a6.45 6.45 0 0 0 1.57-4.23c0-3.59-2.91-6.5-6.5-6.5s-6.5 3-6.5 6.5H2l3.84 4l4.16-4H6.51a4.5 4.5 0 0 1 9 0a4.507 4.507 0 0 1-6.32 4.12L7.71 15.1a6.47 6.47 0 0 0 7.52-.67l.27.27v.79l5.01 4.99L22 19z"/></svg>
                  </button>&nbsp;
                  <button class="buttonlove" (click)="deleteFavorite(city.id)">
                    {{ city.favorite ? '💖' : '🤍'}}                    
                  </button>
                </td>
              </tr>
            }
          </tbody>
        </table>
  
        <!-- Controles de Paginación -->
        @if(totalPages() > 1){
          <div class="pagination">
            <button (click)="changePage(currentPage() - 1)" [disabled]="currentPage() === 1">{{ "HISTORY/FAVORITES.TABLE.pagination.button_prev" | translate }}</button>
            <span>{{ "HISTORY/FAVORITES.TABLE.pagination.description1" | translate }} {{ currentPage() }} {{ "HISTORY/FAVORITES.TABLE.pagination.description2" | translate }} {{ totalPages() }}</span>
            <button (click)="changePage(currentPage() + 1)" [disabled]="currentPage() === totalPages()">{{ "HISTORY/FAVORITES.TABLE.pagination.button_next" | translate }}</button>
          </div>
        }
      }
      
      @if(favorites().length == 0){
        <div class="noresults">
        {{ "HISTORY/FAVORITES.no_favorites" | translate }}
        </div>
      }

      @if (isFavorite()) {
        <p class="isfavoritemsg">{{ "HISTORY/FAVORITES.favorite_deleted" | translate }}</p>
      }
      
  </div>
  `,
  styleUrl: './favorites.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FavoritesComponent {

  private favoriteSvc = inject(FavoriteService);

  favorites = this.favoriteSvc.favorites;

  isFavorite = signal(false);

  currentPage = signal(1);
  itemsPerPage = 5;

  totalPages = computed(() => 
    Math.ceil(this.favorites().length / this.itemsPerPage)
  );

  paginatedHistory = computed(() => {
    const start = (this.currentPage() - 1) * this.itemsPerPage;
    const end = start + this.itemsPerPage;
    return this.favorites().slice(start, end);
  });

  viewDetail(id: number) {
    this.favoriteSvc.goToUpdate(id);
  }

  changePage(pagina: number) {
    if (pagina >= 1 && pagina <= this.totalPages()) {
      this.currentPage.set(pagina);
    }
  }

  deleteFavorite(cityId: number){
    this.favoriteSvc.deleteFromFavorites(cityId);
    this.isFavorite.set(true);
    setTimeout(()=>{
      this.isFavorite.set(false);
    }, 1200)
  }
}
