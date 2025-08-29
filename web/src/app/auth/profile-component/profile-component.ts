import {Component, OnInit} from '@angular/core';
import {User} from '../../Interfaces/Users/user';
import {AuthService} from '../auth-service';
import {DatePipe} from '@angular/common';
import {TranslatePipe} from '@ngx-translate/core';
import {UploadImageDialogComponent} from '../../shared/upload-image-dialog-component/upload-image-dialog-component';
import {NgbModal, NgbModalModule, NgbModalRef} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-profile-component',
  imports: [
    DatePipe,
    TranslatePipe,
    NgbModalModule
  ],
  templateUrl: './profile-component.html',
  styleUrls: ['./profile-component.css']
})
export class ProfileComponent implements OnInit {
  protected user!: User;
  protected avatarUrl!: string;

  constructor(private authService: AuthService,
              private modalService: NgbModal) {}

  ngOnInit(): void {
    this.authService.userProfile().subscribe({
        next: (data: User): void => {
          this.user = data;
          this.avatarUrl = this.avatarPath;
          },
        error: (err: any): void => {console.log(err.message);}
      }
    );
  }

  get avatarPath(): string {
    return this.authService.path + "/" + this.user.avatarPath;
  }

  onAvatarUploaded(file: File): void {
    this.authService.avatarUpload(file).subscribe({
      next: (data: User): void => {
        this.user = data;
        this.avatarUrl = this.avatarPath;},
    })
  }

  onAvatarEdit(): void {
    const modalRef: NgbModalRef = this.modalService.open(UploadImageDialogComponent);
    modalRef.componentInstance.circled = true;
    modalRef.componentInstance.modalTitle = 'profile.settings.editAvatarTitle';

    modalRef.result.then(
      (result:File): void => {this.onAvatarUploaded(result);}
    );
  }
}
