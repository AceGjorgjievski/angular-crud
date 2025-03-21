import { Component, OnInit } from '@angular/core';
import { PhotoService } from '../../shared/services/photo.service';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { Photo } from '../../shared/models/photo/photo.model';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AlertService } from '../../shared/services/alert.service';

@Component({
  selector: 'app-details',
  imports: [
    FormsModule,
    CommonModule,
    RouterLink
  ],
  templateUrl: './details.component.html',
  styleUrl: './details.component.css'
})
export class DetailsComponent implements OnInit {

  photo: Photo = {
    albumId: 0,
    id: 0,
    title: '',
    url: '',
    thumbnailUrl: ''
  };
  
  constructor(
    private photoService: PhotoService,
    private route: ActivatedRoute,
    private router: Router,
    private alertService: AlertService
  ) { }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if(id) {
      this.photoService.getPhotoById(+id).subscribe((data) => {
        if(data) {
          this.photo = data;
        } else {
          this.router.navigate(['/not-found']);
        }
      })
    }
  }

  deletePhoto(): void {
    if(confirm("Are you sure you want to delete this photo?")) {
      this.photoService.deletePhoto(this.photo.id).subscribe(() => {
        this.alertService.setSuccessMessage("Photo deleted successfully !");
        this.router.navigate(['/home']);
      })
    }
  }

}
