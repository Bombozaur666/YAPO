import {Component, OnInit} from '@angular/core';
import {User} from '../../Interfaces/Users/user';
import {AuthService} from '../auth-service';
import {DatePipe} from '@angular/common';
import {TranslatePipe} from '@ngx-translate/core';
import {UploadImageDialogComponent} from '../../shared/upload-image-dialog-component/upload-image-dialog-component';

@Component({
  selector: 'app-profile-component',
  imports: [
    DatePipe,
    TranslatePipe,
    UploadImageDialogComponent
  ],
  templateUrl: './profile-component.html',
  styleUrl: './profile-component.css'
})
export class ProfileComponent implements OnInit {
  protected user!: User;

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    this.authService.userProfile().subscribe({
        next: data => {this.user = data;},
        error: err => {console.log(err.message);}
      }
    );
  }

  onAvatarUploaded(file: File) {
    this.authService.avatarUpload(file).subscribe({
      next: data => {this.user = data; console.log('Avatar uploaded', data);},
    })
  }
}
