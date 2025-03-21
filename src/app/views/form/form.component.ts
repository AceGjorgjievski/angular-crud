import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import {
  ActivatedRoute,
  Router,
  RouterLink,
  RouterLinkActive,
  RouterOutlet,
} from '@angular/router';
import { Photo } from '../../shared/models/photo/photo.model';
import { FormsModule } from '@angular/forms';
import { PhotoService } from '../../shared/services/photo.service';
import { AlertService } from '../../shared/services/alert.service';

@Component({
  selector: 'app-form',
  standalone: true,
  imports: [
    RouterLink,
    RouterOutlet,
    RouterLinkActive,
    CommonModule,
    FormsModule,
  ],
  templateUrl: './form.component.html',
  styleUrl: './form.component.css',
})
export class FormComponent implements OnInit {
  photo: Photo = { id: 0, title: '', url: '', thumbnailUrl: '', albumId: 0 };
  isEditMode = false;
  showAlert = false;

  constructor(
    private photoService: PhotoService,
    private route: ActivatedRoute,
    private router: Router,
    private alertService: AlertService
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    console.log("id for edit: ", id);
    if (id) {
    console.log("id for edit - if statement: ", id);

      this.isEditMode = true;
      this.photoService.getPhotoById(+id).subscribe((photo) => {
        if (photo) {
          this.photo = photo;
        } else {
          this.router.navigate(['/not-found']);
        }
      });
    }
  }

  onSubmit() {
    if (
      !this.photo.title ||
      !this.photo.url ||
      this.photo.title.trim().length === 0 ||
      this.photo.url.trim().length === 0 
    ) {
      alert('Please fill out the forms');
      return;
    }

    if (this.isEditMode) {
      const id = this.route.snapshot.paramMap.get('id');
      this.photoService.editPhoto(+id!, this.photo);
    } else {
      this.photoService.addPhoto(this.photo).subscribe((photo) => {
        this.alertService.setSuccessMessage("New photo has been added!");
      });
    }
    this.router.navigate(['/home']);
  }
}
