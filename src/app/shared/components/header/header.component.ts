import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { TranslatePipe, TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-header',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [
    RouterModule,
    TranslatePipe
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {

  locales = [
    { value: 'es', name: 'ES' },
    { value: 'en', name: 'EN' },
  ]
  
  navActive: boolean = false;
  
  get toggle(){
    return (this.navActive) ? 'nav__menu--active' : 'nav__menu';
  }

  constructor(private translateSvc: TranslateService){
    this.translateSvc.use('es');
  }

  changeLanguage(event: Event){
    if(event.target){
      const changeEvent = event.target as HTMLInputElement;
      this.translateSvc.use(changeEvent.value);
    }
  }

  public toggleMenu(){
    this.navActive = !this.navActive;    
  }
}
