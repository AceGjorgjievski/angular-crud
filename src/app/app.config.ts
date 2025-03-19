import { ApplicationConfig, importProvidersFrom, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { HttpClientModule, provideHttpClient, withInterceptors } from '@angular/common/http';
import { cacheInterceptor } from './shared/interceptors/cache-interceptor';

export const appConfig: ApplicationConfig = {
  providers: [
      provideZoneChangeDetection({ eventCoalescing: true }), 
      provideRouter(routes),
      importProvidersFrom(HttpClientModule),
      provideHttpClient(withInterceptors([cacheInterceptor]))
    ]
};
