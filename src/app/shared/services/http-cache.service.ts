import { HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class HttpCacheService {

  private requests: any = { }

  constructor() { }

  put(url: string, response: HttpResponse<any>): void {
    this.requests[url] = response;
  }

  get(url: string): HttpResponse<any> | undefined {
    return this.requests[url];
  }

  //when adding a new item, we need a fresh copy
  //only one url removing - for images, and not for categories(example)
  invalidateUrl(url: string): void {
    this.requests[url] = undefined;
  }

  invalidateCache(): void {
    this.requests = { };
  }
}
