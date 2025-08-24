import {Component, EventEmitter, Input, Output} from '@angular/core';
import {CommonModule} from '@angular/common';
import {TranslatePipe} from '@ngx-translate/core';

@Component({
  selector: 'app-upload-image-dialog-component',
  imports: [CommonModule, TranslatePipe],
  templateUrl: './upload-image-dialog-component.html',
  styleUrl: './upload-image-dialog-component.css'
})
export class UploadImageDialogComponent {
  selectedFile: File | null = null;
  previewUrl: string | ArrayBuffer | null = null;

  @Input() circled: boolean = false;
  @Input() modalTitle: string = '' ;

  @Output() imageUploaded = new EventEmitter<File>();

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.selectedFile = input.files[0];

      const reader = new FileReader();
      reader.onload = e => this.previewUrl = reader.result;
      reader.readAsDataURL(this.selectedFile);
    }
  }

  uploadImage(): void {
    if (!this.selectedFile) return;
    this.imageUploaded.emit(this.selectedFile);
  }
}
