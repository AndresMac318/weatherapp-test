import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterOutlet } from '@angular/router';
import { HeaderComponent } from "./shared/components/header/header.component";
import { FooterComponent } from './shared/components/footer/footer.component';
import { TranslateModule, TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet, 
    TranslateModule,
    HeaderComponent,
    FooterComponent,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export default class AppComponent implements OnInit {
  title = 'weatherapp';

  constructor( private activatedRoute: ActivatedRoute,
    private translateSvc: TranslateService
  ){
    const langDefaultBrowser = this.translateSvc.getBrowserLang();
    if(langDefaultBrowser !== undefined){
      this.translateSvc.setDefaultLang(langDefaultBrowser);
    }
  }

  ngOnInit(): void {
    this.activatedRoute.fragment.subscribe((fragment: string | null) => {
      if(fragment) this.jumpToSection(fragment);
    });
  }

  jumpToSection(section: string | null){
    if (section) {
      document.getElementById(section)?.scrollIntoView({behavior: 'smooth'});
    }
  }
}
