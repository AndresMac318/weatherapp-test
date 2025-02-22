import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { TranslatePipe } from '@ngx-translate/core';

@Component({
  selector: 'app-not-found',
  standalone: true,
  imports: [ RouterLink, TranslatePipe ],
  template: `
    <article class="notfound">
      <h1 class="notfound__errorcode">404</h1>
      <p class="notfound__errormessage">{{ "NOT_FOUND_COMPONENT.page" | translate }}</p>
      <a routerLink="/" class="notfound__homelink">{{ "NOT_FOUND_COMPONENT.to_home" | translate }}</a>
    </article>
  `,
  styleUrl: './not-found.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NotFoundComponent { }
