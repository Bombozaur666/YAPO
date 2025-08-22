import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Localization} from '../Interfaces/Plants/localization';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PlantsCollectionService {
  protected baseUrl: string = 'http://localhost:8080/';
  constructor(private httpClient: HttpClient) {}

  locationsFetch():  Observable<Localization[]> {
    return this.httpClient.get<Localization[]>(this.baseUrl + 'localization/');
  }
}
