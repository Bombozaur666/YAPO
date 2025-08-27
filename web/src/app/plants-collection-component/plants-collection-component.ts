import {Component, OnInit} from '@angular/core';
import {PlantsCollectionService} from './plants-collection-service';
import {Localization, LocalizationWithoutPlants} from '../Interfaces/Plants/localization';
import {Plant} from '../Interfaces/Plants/plant';
import {LocalizationsComponent} from './localizations-component/localizations-component';
import {PlantDetailComponent} from './plant-detail-component/plant-detail-component';
import {TranslatePipe} from '@ngx-translate/core';
import {PlantsListComponent} from './plants-list-component/plants-list-component';

@Component({
  selector: 'app-plants-collection-component',
  imports: [
    LocalizationsComponent,
    PlantsListComponent,
    PlantDetailComponent,
    TranslatePipe,
    PlantsListComponent
  ],
  templateUrl: './plants-collection-component.html',
  styleUrl: './plants-collection-component.css'
})
export class PlantsCollectionComponent implements OnInit {
  protected localizations: Localization[] = [];

  protected initialized: boolean = false;

  protected selectedPlant: number|null = null;
  protected selectedLocalization: number |null = null;

  protected localizationsWithoutPlants: LocalizationWithoutPlants[] = [];
  protected showPlants: Plant[] = [];
  protected plant: Plant = {} as Plant;

  constructor(private  plantsCollectionService: PlantsCollectionService) {}

  ngOnInit(): void {
    this.plantsCollectionService.locationsFetch().subscribe(
      {
        next: (data: Localization[]): void => {
          this.localizations = data;
          this.localizationsWithoutPlants = this.localizationList();
          this.initialized = true;
        }
      }
    );
  }

  selectPlant(id: number): void {
    this.selectedPlant = id;
    this.plant = this.showPlants.find((_plant: Plant): boolean => _plant.id === id)!;
  }

  localizationChange(id: number): void {
    this.selectedPlant = null;
    this.plant = {} as Plant;
    this.selectedLocalization = id;
    this.showPlants = this.preparePlants(id);
  }

  preparePlants(id : number): Plant[] {
    return this.localizations.find((_localization: Localization): boolean => _localization.id === id)!.plants;
  }

  localizationList(): LocalizationWithoutPlants[] {
    return this.localizations.map(({ plants, ...rest }: Localization) => rest);
  }

  localizationUpdateOrCreate(localization: LocalizationWithoutPlants): void {
    this.plantsCollectionService.localizationUpdateOrCreate(localization).subscribe(
      {
        next: (data: Localization): void => {
          const index: number = this.localizations.findIndex((_localization: Localization): boolean => _localization.id === data.id);
          if (index === -1) {
            this.localizations = [...this.localizations, data];
            this.localizationsWithoutPlants = this.localizationList();
          }
          else {
            this.localizations = this.localizations.map((_localization: Localization, _index: number): Localization =>
              _index === index ? data : _localization
            );
            this.localizationsWithoutPlants = this.localizationList();
          }
        },
        error: (error: any): void => {console.log(error.message);}
      }
    );
  }

  createPlant(newPlant: Plant): void {
    this.localizations = this.localizations.map((_localization: Localization) => {
      if (_localization.id === this.selectedLocalization) {
        if (_localization.plants) {
          const plantIndex: number = _localization.plants.findIndex((_plant: Plant):boolean => _plant.id === newPlant.id);
          const updatedPlants: Plant[] = plantIndex !== -1
            ? _localization.plants.map((_plant: Plant, _index: number): Plant => _index === plantIndex ? newPlant : _plant)
            : [..._localization.plants, newPlant];
          return { ..._localization, plants: updatedPlants };
        } else {
          return { ..._localization, newPlant}
        }
      }
      return _localization;
    });
    this.showPlants = this.preparePlants(this.selectedLocalization!);
  }

  localizationRemove(localization: LocalizationWithoutPlants): void {
    this.plantsCollectionService.removeLocalization(localization).subscribe({
      next: (): void => {
        this.localizations = this.localizations.filter((_localization: Localization): boolean => _localization.id !== localization.id);
        this.localizationsWithoutPlants = this.localizationList();
        this.selectedLocalization = null;
        this.showPlants = [];
      }
    })

  }

  onRemovePlant(plant: Plant): void {
    this.plantsCollectionService.removePlant(plant.id).subscribe({
      next: ():void => {
        this.localizations = this.localizations.map((_localization: Localization): Localization =>
          _localization.id === this.selectedLocalization!
            ? { ..._localization, plants: _localization.plants.filter((_plant: Plant): boolean => _plant.id !== plant.id) }
            : _localization
        );
        this.localizationsWithoutPlants = this.localizationList();
        this.showPlants =  this.preparePlants(this.selectedLocalization!);
        this.selectedPlant = null;
      },
      error: (error: any): void => {console.log(error.message);}
    })
  }

  onPlantAvatarChange(plant: Plant): void {
    this.localizations = this.localizations.map((
      _localization: Localization): Localization =>
        _localization.id === this.selectedLocalization!
          ? { ..._localization, plants: _localization.plants.map((_plant: Plant): Plant =>
              _plant.id === plant.id
                ? { ..._plant, avatarPath: plant.avatarPath }
                : _plant),
            }
          : _localization
    );
    this.showPlants = this.preparePlants(this.selectedLocalization!);
  }
}
