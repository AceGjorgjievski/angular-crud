import { Component, OnInit } from '@angular/core';
import { Photo } from '../../shared/models/photo/photo.model';
import { PhotoService } from '../../shared/services/photo.service';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { AlertService } from '../../shared/services/alert.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink
  ],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit{

  photos: Photo[] = [];
  successMessage: string | null = null;

  constructor(
    private photoService: PhotoService,
    private alertService: AlertService
  ) {}

  ngOnInit(): void {

    this.successMessage = this.alertService.getSuccessMessage();
    if (this.successMessage) {
      setTimeout(() => this.successMessage = null, 2000);
    }

    console.log("Component initialized");
    this.photoService.loadPhotos().subscribe((data) => {
      this.photos = data;
      console.log("Fetched photos:", this.photos);
    });
  }
}
