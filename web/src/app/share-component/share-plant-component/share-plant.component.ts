import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {TranslatePipe} from '@ngx-translate/core';
import {ShareService} from '../share.service';
import {Plant} from '../../Interfaces/Plants/plant';

@Component({
  selector: 'app-share-component',
  imports: [
    TranslatePipe
  ],
  templateUrl: './share-plant.component.html',
  styleUrl: './share-plant.component.css'
})
export class SharePlantComponent implements OnInit{
  private plantId: string | null = null;

  protected plant: Plant|null = null;

  protected loading: boolean = false;

  constructor(private route: ActivatedRoute,
              private shareService: ShareService) {}

  ngOnInit(): void {
    this.plantId = this.route.snapshot.queryParamMap.get('query');

    this.shareService.getPlant(this.plantId).subscribe({
      next: Plant => {},
      error: error => {}
      }
    );

  }
}
