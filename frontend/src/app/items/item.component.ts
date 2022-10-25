import { Component, OnInit } from '@angular/core';
import { Item } from './item.model';
import { ItemService } from './item.service';
import { MapService } from './map.service';

@Component({
  selector: 'app-item',
  template: `
    <div class="search-btn">
      <mat-form-field class="item-card" appearance="fill" fxFlex="75">
        <mat-label>Search for items </mat-label>
        <input matInput [(ngModel)]="searchItems" />
        <mat-icon matSuffix>search</mat-icon>
        <div class="spacer"></div>
      </mat-form-field>
    </div>

    <div class="items" *ngIf="items">
      <div fxLayout="row wrap" fxLayoutGap="16px grid">
        <div
          id="mat-card-items"
          fxFlex="33%"
          fxFlex.xs="100%"
          fxFlex.sm="50%"
          *ngFor="let item of items | searchText: searchItems"
        >
          <a routerLink="/items/{{ item._id }}" (onclick)="handleSubject()">
            <mat-card class="item-card mat-elevation-z4">
              <mat-card-header class="card-container">
                <mat-card-title>{{ item.postType }}</mat-card-title>
                <mat-card-subtitle>{{ item.itemType }}</mat-card-subtitle>
              </mat-card-header>
              <mat-card-content>
                <div class="post-item">
                  <div class="item-image">
                    <img
                      mat-card-image
                      src="{{ item.imageUrl }}"
                      alt="laptop"
                    />
                  </div>
                </div>

                <h3>{{ item.description }}</h3>
              </mat-card-content>
              <mat-card-footer>
                <!-- I think we need to the map here or on the details page  -->
              </mat-card-footer>
            </mat-card>
          </a>
        </div>
      </div>
    </div>
  `,
  styles: [
    `
      .items {
        padding: 16px;
      }
      .card-container {
        color: #e64a19;
        display: flex;
        justify-content: center;
        align-items: center;
      }
      ,
      .item-card {
        width: 40%;
        margin: 0 auto;
      }

      mat-card {
        margin: 10px;
        padding: 50px;
        border-radius: 10px;
        cursor: pointer;
        text-align: center;
        height: 80%;

      }

      .search-btn {
        margin: 25px;
        display: flex;
        justify-content: center;
        font-size: 20px;
        border-radius: 15px;
      }
      a {
        text-decoration: none;
      }
    `,
  ],
})
export class ItemComponent implements OnInit {
  items: Item[] = [];
  searchItems: string = '';
  constructor(private itemService: ItemService,private mapService:MapService) {}

  ngOnInit(): void {
    this.getAllItems();
  }

  getAllItems() {
    this.itemService.getItems().subscribe({
      next: (result: Item[]) => {
        this.items = result;
      },
      error: (err: any) => {
        console.log(err);
      },
    });
  }
  handleSubject(){
    // this.mapService.currentLocation.next()
  }
}
