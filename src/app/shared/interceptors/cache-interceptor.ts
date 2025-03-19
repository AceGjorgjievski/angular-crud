import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { HttpCacheService } from '../services/http-cache.service';
import { of, tap } from 'rxjs';

export const cacheInterceptor: HttpInterceptorFn = (req, next) => {
  const httpCacheService = inject(HttpCacheService);

  if (req.method !== 'GET') {
    console.log(`Invalidating cache... ${req.method} -- ${req.url}`);
    httpCacheService.invalidateCache();
    return next(req);
  }

  const cachedResponse = httpCacheService.get(req.url);
  if (cachedResponse) {
    console.log(`Returning a cached response: ${cachedResponse.url}`);
    return of(cachedResponse);
  }

  return next(req).pipe(
    tap((event) => {
      if (event.type === 4) { // 4 = HttpResponse
        console.log(`Adding item to cache: ${req.url}`);
        httpCacheService.put(req.url, event);
      }
    })
  );
};
