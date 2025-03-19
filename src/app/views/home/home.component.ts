import { Component, OnInit } from '@angular/core';
import { Photo } from '../../shared/models/photo/photo.model';
import { PhotoService } from '../../shared/services/photo.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CommonModule
  ],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit{

  photos: Photo[] = [];

  constructor(private photoService: PhotoService) {}

  ngOnInit(): void {
    console.log("Component initialized");
    this.photoService.getPhotos().subscribe((data) => {
      this.photos = data.slice(0, 10);
      console.log("Fetched photos:", this.photos);
    });
  }

}
