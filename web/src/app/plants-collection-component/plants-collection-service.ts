import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Localization, LocalizationWithoutPlants} from '../Interfaces/Plants/localization';
import {Observable} from 'rxjs';
import {Plant} from '../Interfaces/Plants/plant';

@Injectable({
  providedIn: 'root'
})
export class PlantsCollectionService {
  protected baseUrl: string = 'http://localhost:8080/';
  constructor(private httpClient: HttpClient) {}

  locationsFetch():  Observable<Localization[]> {
    return this.httpClient.get<Localization[]>(this.baseUrl + 'localization/');
  }

  localizationUpdateOrCreate(localization: LocalizationWithoutPlants): Observable<Localization>{
    return this.httpClient.post<Localization>(this.baseUrl + "localization/create-localization", localization,{withCredentials: true});
  }

  createPlant(plant: Plant): Observable<Plant> {
    return this.httpClient.post<Plant>(`${this.baseUrl}plants/create-plant`, plant, {withCredentials: true});
  }

  removeLocalization(localization: LocalizationWithoutPlants): Observable<boolean> {
    return this.httpClient.delete<boolean>(`${this.baseUrl}localization/${localization.id}`);
  }

  updatePlantAvatar(file: File, plantID: number): Observable<Plant> {
    const form = new FormData();
    form.append('file', file);
    return this.httpClient.post<Plant>(this.baseUrl + "plants/avatar/" + plantID, form);
  }

  avatarPath(plant: Plant): string {
    return "http://localhost:8080/plants/avatar/" + plant.avatarPath;
  }

  removePlant(id: number): Observable<any> {
    return this.httpClient.delete<any>(`${this.baseUrl}plants/${id}`);
  }
}
