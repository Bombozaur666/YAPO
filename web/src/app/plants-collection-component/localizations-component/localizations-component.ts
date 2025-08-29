import {Component, EventEmitter, Input, Output} from '@angular/core';
import {Localization, LocalizationWithoutPlants} from '../../Interfaces/Plants/localization';
import {TranslatePipe} from '@ngx-translate/core';
import {NgbModal, NgbModalRef} from '@ng-bootstrap/ng-bootstrap';
import {LocalizationChangeComponent} from './localization-change-componennt/localization-change.component';
import {PlantsCollectionService} from '../plants-collection-service';

@Component({
  selector: 'app-localizations-component',
  imports: [
    TranslatePipe
  ],
  templateUrl: './localizations-component.html',
  styleUrl: './localizations-component.css'
})
export class LocalizationsComponent {
  protected selectedLocalization: LocalizationWithoutPlants = {"name": ""};
  @Input() localizations: LocalizationWithoutPlants[] = [];
  @Output() localizationUpdateOrCreate: EventEmitter<Localization> = new EventEmitter<Localization>();
  @Output() localizationRemove: EventEmitter<LocalizationWithoutPlants> = new EventEmitter<LocalizationWithoutPlants>();
  @Output() localizationsChange: EventEmitter<number> = new EventEmitter<number>();

  constructor(private modalService: NgbModal,
              private  plantsCollectionService: PlantsCollectionService) {}
  selectLocalization(localization: LocalizationWithoutPlants): void {
    this.selectedLocalization = localization;
    this.localizationsChange.emit(localization.id);
  }

  editOrCreateLocalization(isEdit: boolean): void {
    const modalRef: NgbModalRef = this.modalService.open(LocalizationChangeComponent);
    if (isEdit) {
      modalRef.componentInstance.localization = this.selectedLocalization
      modalRef.componentInstance.title = 'collections.localizations.editLocalization';
    } else {
      modalRef.componentInstance.title = 'collections.localizations.addLocalization';
    }

    modalRef.result.then(
      (result:{"mode": "add"|"delete" , localization: LocalizationWithoutPlants}): void => {
        if (result.mode === "add") {
          this.plantsCollectionService.localizationUpdateOrCreate(result.localization).subscribe({
              next: (data: Localization): void => {this.localizationUpdateOrCreate.emit(data);},
              error: (error: any): void => {console.log(error.message);}
            }
          );
        } else if (result.mode==="delete") {
          this.plantsCollectionService.removeLocalization(result.localization).subscribe({
            next: (): void => {this.localizationRemove.emit(result.localization);
            }
          })
        }
      }
    );
  }
}
