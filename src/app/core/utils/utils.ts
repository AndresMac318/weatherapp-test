import { HttpClient } from "@angular/common/http";
import { TranslateHttpLoader } from "@ngx-translate/http-loader";

export const translateLoaderFactory: (http: HttpClient) => TranslateHttpLoader = (http: HttpClient) => 
    new TranslateHttpLoader(http, './assets/i18n/', '.json');
