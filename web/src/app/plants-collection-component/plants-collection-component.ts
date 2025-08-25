import {Component, OnInit} from '@angular/core';
import {PlantsCollectionService} from './plants-collection-service';
import {Localization, LocalizationWithoutPlants} from '../Interfaces/Plants/localization';
import {Plant} from '../Interfaces/Plants/plant';
import {LocalizationsComponent} from './localizations-component/localizations-component';
import {PlantsComponent} from './plants-component/plants-component';
import {PlantDetailComponent} from './plant-detail-component/plant-detail-component';
import {TranslatePipe} from '@ngx-translate/core';

@Component({
  selector: 'app-plants-collection-component',
  imports: [
    LocalizationsComponent,
    PlantsComponent,
    PlantDetailComponent,
    TranslatePipe
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
        next: (data: Localization[]) => {
          this.localizations = data;
          this.localizationsWithoutPlants = this.localizationList();
          this.initialized = true;
        }
      }
    );
  }

  selectPlant(id: number): void {
    this.selectedPlant = id;
    this.plant = this.showPlants.find(loc => loc.id === id)!;
  }

  localizationChange(id: number): void {
    this.selectedPlant = null;
    this.plant = {} as Plant;
    this.selectedLocalization = id;
    this.showPlants = this.preparePlants(id);
  }

  preparePlants(id : number): Plant[] {
    return this.localizations.find(loc => loc.id === id)!.plants;
  }

  localizationList(): LocalizationWithoutPlants[] {
    return this.localizations.map(({ plants, ...rest }) => rest);
  }

  localizationUpdateOrCreate(localization: LocalizationWithoutPlants): void {
    this.plantsCollectionService.localizationUpdateOrCreate(localization).subscribe(
      {
        next: (data: Localization) => {
          const index = this.localizations.findIndex(loc => loc.id === data.id);
          if (index === -1) {
            this.localizations = [...this.localizations, data];
            this.localizationsWithoutPlants = this.localizationList();
          }
          else {
            this.localizations = this.localizations.map((l, i) =>
              i === index ? data : l
            );
            this.localizationsWithoutPlants = this.localizationList();
          }
        },
        error: error => {console.log(error.message);}
      }
    );
  }

  createPlant(plant: Plant) {
    plant.localization = {
      ...plant.localization,
      id: this.selectedLocalization!
    };
    this.plantsCollectionService.createPlant(plant).subscribe({
        next: (data: Plant) => {
          this.localizations = this.localizations.map(loc => {
            if (loc.id === this.selectedLocalization) {
              const plantIndex = loc.plants.findIndex(p => p.id === data.id);

              const updatedPlants = plantIndex !== -1
                ? loc.plants.map((p, i) => i === plantIndex ? data : p)
                : [...loc.plants, data];

              return { ...loc, plants: updatedPlants };
            }
            return loc;
          });
          this.showPlants = this.preparePlants(this.selectedLocalization!);
        },
      }
    )
  }
}
