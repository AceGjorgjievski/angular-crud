import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Photo } from '../models/photo/photo.model';

@Injectable({
  providedIn: 'root'
})
export class PhotoService {

  private apiUrl: string = 'https://jsonplaceholder.typicode.com/photos';

  constructor(private httpClient: HttpClient) { }

  getPhotos () : Observable<Photo[]> {
    return this.httpClient.get<Photo[]>(this.apiUrl);
  }
}
