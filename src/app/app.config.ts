import { ApplicationConfig, importProvidersFrom, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { HttpClient, provideHttpClient, withInterceptors } from '@angular/common/http';
import { ErrorInterceptor } from './interceptors/error.interceptor';
import { AuthInterceptor } from './interceptors/auth.interceptor';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideClientHydration } from '@angular/platform-browser';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import {TranslateHttpLoader} from "@ngx-translate/http-loader";


export function createTranslateLoader(http:HttpClient) {
  return new TranslateHttpLoader(http, './i18n/', '.json')
}


export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideClientHydration(),
    provideAnimationsAsync(),
    provideHttpClient(withInterceptors([ErrorInterceptor, AuthInterceptor])), 
    importProvidersFrom([
      TranslateModule.forRoot({
        loader:{
          provide:TranslateLoader,
          useFactory:createTranslateLoader,
          deps:[HttpClient],
        },
        defaultLanguage: 'en',
      })
    ])

  ],
};
