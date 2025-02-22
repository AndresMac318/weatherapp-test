import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HistoryComponent } from './history.component';
import { HistoryService } from '../../services/history/history.service';
import { signal } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';


describe('HistoryComponent', () => {
  let component: HistoryComponent;
  let fixture: ComponentFixture<HistoryComponent>;
  let historyServiceSpy: jasmine.SpyObj<HistoryService>;

  beforeEach(() => {
    const historyServiceMock = jasmine.createSpyObj('HistoryService', ['goToUpdate', 'addToFavorite'], {
      history: signal([])
    });

    TestBed.configureTestingModule({
      imports: [HistoryComponent, TranslateModule.forRoot()], 
      providers: [
        { provide: HistoryService, useValue: historyServiceMock }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(HistoryComponent);
    component = fixture.componentInstance;
    historyServiceSpy = TestBed.inject(HistoryService) as jasmine.SpyObj<HistoryService>;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should inject HistoryService correctly', () => {
    expect(historyServiceSpy).toBeTruthy();
  });
});
