import {Component, OnInit} from '@angular/core';
import {PlantsCollectionService} from './plants-collection-service';
import {Localization, LocalizationWithoutPlants} from '../Interfaces/Plants/localization';
import {Plant} from '../Interfaces/Plants/plant';
import {LocalizationsComponent} from './localizations-component/localizations-component';
import {PlantsComponent} from './plants-component/plants-component';
import {PlantDetailComponent} from './plant-detail-component/plant-detail-component';


@Component({
  selector: 'app-plants-collection-component',
  imports: [
    LocalizationsComponent,
    PlantsComponent,
    PlantDetailComponent
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
    this.showPlants = this.localizations.find(loc => loc.id === id)!.plants;
  }

  localizationList(): LocalizationWithoutPlants[] {
    return this.localizations.map(({ plants, ...rest }) => rest);
  }
}
