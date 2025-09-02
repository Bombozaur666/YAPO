import {Component, Input, OnInit} from '@angular/core';
import {PhotoGallery} from '../../../../Interfaces/Plants/photo-gallery';
import {PlantsCollectionService} from '../../../plants-collection-service';

@Component({
  selector: 'app-photo-component',
  imports: [],
  templateUrl: './photo-component.html',
  styleUrl: './photo-component.css'
})
export class PhotoComponent implements OnInit {
  @Input() photo!: PhotoGallery;
  @Input() plantId!: number;

  protected photoUrl!: string;

  constructor(private plantsCollectionService: PlantsCollectionService) {}

  ngOnInit(): void {
        this.getPhotoImage();
    }

  getPhotoImage(): void {
    this.plantsCollectionService.getPhoto(this.photoPath).subscribe({
      next: (blob: Blob): void => {
        this.photoUrl = URL.createObjectURL(blob);
      },
      error: (err) => console.error(err)
    })
  }

  get photoPath(): string {return this.plantsCollectionService.photoPath(this.plantId, this.photo.imagePath);}
}
