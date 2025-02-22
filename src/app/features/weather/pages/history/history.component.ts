import { ChangeDetectionStrategy, Component, computed, inject, OnInit, signal } from '@angular/core';
import { HistoryService } from '../../services/history/history.service';
import { DatePipe } from '@angular/common';
import { TranslatePipe } from '@ngx-translate/core';

@Component({
  selector: 'app-history',
  standalone: true,
  imports: [DatePipe, TranslatePipe],
  template: `
    <div class="table-container">
      <h2 class="table-title">{{ "HISTORY/FAVORITES.title_history" | translate }}</h2>
      @if (history().length > 0) {
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
                  <button class="button" (click)="viewDetails(city.id)">
                    
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="#FFFFFF" d="M17.01 14h-.8l-.27-.27a6.45 6.45 0 0 0 1.57-4.23c0-3.59-2.91-6.5-6.5-6.5s-6.5 3-6.5 6.5H2l3.84 4l4.16-4H6.51a4.5 4.5 0 0 1 9 0a4.507 4.507 0 0 1-6.32 4.12L7.71 15.1a6.47 6.47 0 0 0 7.52-.67l.27.27v.79l5.01 4.99L22 19z"/></svg>
                    
                  </button>&nbsp;
                  <button [disabled]="city.favorite" class="buttonlove" (click)="addFavorite(city.id)">
                    {{ city.favorite ? '💖' : '🤍'}}                    
                  </button>
                </td>
              </tr>
            }
          </tbody>
        </table>
  
        <!-- Pagination controls -->
        @if(totalPages() > 1){
          <div class="pagination">
            <button (click)="changePage(currentPage() - 1)" [disabled]="currentPage() === 1">{{ "HISTORY/FAVORITES.TABLE.pagination.button_prev" | translate }}</button>
            <span>{{ "HISTORY/FAVORITES.TABLE.pagination.description1" | translate }} {{ currentPage() }} {{ "HISTORY/FAVORITES.TABLE.pagination.description2" | translate }} {{ totalPages() }}</span>
            <button (click)="changePage(currentPage() + 1)" [disabled]="currentPage() === totalPages()">{{ "HISTORY/FAVORITES.TABLE.pagination.button_next" | translate }}</button>
          </div>
        }

      }
      
      @if(history().length == 0){
        <div class="noresults">
        {{ "HISTORY/FAVORITES.no_results" | translate }}
        </div>
      }

      @if (isFavorite()) {
        <p class="isfavoritemsg">{{ "HISTORY/FAVORITES.favorite_add" | translate }}</p>
      }
      
  </div>
  `,
  styleUrl: './history.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HistoryComponent {
    
  private historySvc = inject(HistoryService);

  history = this.historySvc.history;
  
  isFavorite = signal(false);

  currentPage = signal(1);
  itemsPerPage = 5;

  totalPages = computed(() => 
    Math.ceil(this.history().length / this.itemsPerPage)
  );

  paginatedHistory = computed(() => {
    const start = (this.currentPage() - 1) * this.itemsPerPage;
    const end = start + this.itemsPerPage;
    return this.history().slice(start, end);
  });
  
  viewDetails(id: number) {
    this.historySvc.goToUpdate(id);
  }

  changePage(pagina: number) {
    if (pagina >= 1 && pagina <= this.totalPages()) {
      this.currentPage.set(pagina);
    }
  }

  addFavorite(cityId: number){
    this.historySvc.addToFavorite(cityId);
    this.isFavorite.set(true);
    setTimeout(()=>{
      this.isFavorite.set(false);
    }, 1200)
    
  }
}
