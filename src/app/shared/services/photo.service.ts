import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Photo } from '../models/photo/photo.model';

@Injectable({
  providedIn: 'root'
})
export class PhotoService {

  private apiUrl: string = 'https://jsonplaceholder.typicode.com/photos';
  private photos: Photo[] = [];

  constructor(private httpClient: HttpClient) { }


  loadPhotos(): Observable<Photo[]> {
    if(this.photos.length > 0) {
      console.log("enters here");
      return of(this.photos);
    }

    return new Observable((observer) => {
      this.httpClient.get<Photo[]>(this.apiUrl).subscribe((data) => {
        this.photos = data.slice(0, 10);
        observer.next(this.photos);
        observer.complete();
      })
    })
  }

  getPhotos () : Observable<Photo[]> {
    return of(this.photos);
  }

  getPhotoById(id: number) : Observable<Photo | undefined> {
    if (this.photos.length > 0) {
      const photo = this.photos.find(photo => photo.id === id);
      return of(photo);
    }
  
    // If photos are not loaded, fetch them first
    return new Observable((observer) => {
      this.loadPhotos().subscribe(() => {
        const photo = this.photos.find(photo => photo.id === id);
        observer.next(photo);
        observer.complete();
      });
    });
  }

  addPhoto(photo: Photo): Observable<Photo> {
    const newPhoto = { 
      ...photo, 
      id: this.photos[this.photos.length-1].id + 1, 
      albumId:  this.photos[this.photos.length-1].albumId + 1
    }; 
    this.photos.unshift(newPhoto);
    return of(newPhoto);
  }

  deletePhoto(id: number): Observable<boolean> {
    const index = this.photos.findIndex((photo) => photo.id === id);

    if(index !== -1) {
      this.photos.splice(index, 1);
      return of(true);
    }

    return of(false);
  }

  editPhoto(id: number, photo: Photo): Observable<Photo | null> {
    return new Observable((observer) => {
      this.getPhotoById(id).subscribe((foundPhoto) => {
        if (foundPhoto) {
          foundPhoto.title = photo.title;
          foundPhoto.url = photo.url;
          observer.next(foundPhoto);
          observer.complete();
        } else {
          observer.next(null);
          observer.complete();
        }
      });
    });
  }
  
}
