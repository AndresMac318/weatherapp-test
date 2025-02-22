import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FavoritesComponent } from './favorites.component';
import { FavoriteService } from '../../services/favorite/favorite.service';
import { signal } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';

describe('FavoritesComponent', () => {
  let component: FavoritesComponent;
  let fixture: ComponentFixture<FavoritesComponent>;
  let favoriteServiceSpy: jasmine.SpyObj<FavoriteService>;

  beforeEach(() => {
    const favoriteServiceMock = jasmine.createSpyObj('FavoriteService', ['goToUpdate', 'deleteFromFavorites'], {
      favorites: signal([]) 
    });

    TestBed.configureTestingModule({
      imports: [FavoritesComponent, TranslateModule.forRoot()],
      providers: [
        { provide: FavoriteService, useValue: favoriteServiceMock }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(FavoritesComponent);
    component = fixture.componentInstance;
    favoriteServiceSpy = TestBed.inject(FavoriteService) as jasmine.SpyObj<FavoriteService>;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should inject FavoriteService correctly', () => {
    expect(favoriteServiceSpy).toBeTruthy();
  });
});
