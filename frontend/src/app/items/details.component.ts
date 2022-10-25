import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Item } from './item.model';
import { ItemService } from './item.service';

@Component({
  selector: 'app-details',
  template: `
    <div class="container">
      <div class="item-card">
        <mat-card>
          <mat-card-content>
            <div>
              <div>
                <hr />
                <h1>Item Informations</h1>

                <label class="titles">Post Type:</label>
                <label>{{ item.postType }}</label>
                <div class="spacer"></div>
                <br />

                <label class="titles">Item Type:-</label>
                <label>{{ item.itemType }}</label>
                <div class="spacer"></div>
                <br />
                <label class="titles">Item Decription:-</label>
                <label>{{ item.description }}</label>

                <div class="spacer"></div>
                <br />
                <label class="titles">Item Type:-</label>
                <label>{{ item.description }}</label>
                <div class="spacer"></div>
                <br />
                <label class="titles">Item Image:-</label>

                <div class="spacer"></div>
                <br />
                <br />
                <mat-card-content>
                  <mat-card>
                    <img
                      src="{{ item.imageUrl }}"
                      alt="{{ item.itemType }}"
                    /> </mat-card
                ></mat-card-content>
              </div></div></mat-card-content
        ></mat-card>
      </div>
      <div class="map">
        <app-map></app-map>
      </div>
    </div>
  `,

  styles: [
    `
      .titles {
        color: green;
      }
      h1 {
        color: red;
      }
      .item-card {
        width: 35%;
        margin-left: 100px;
      }
      img {
        max-width: 100rem;
        max-height: 15rem;
      }
      .container {
        display: flex;
        justify-content: space-evenly;
        align-items: center;
      }
      .google-map {
        position: relative;
        align-items: center;
      }
      .map {
        width: 65%;
        margin: 30px;
        margin-right: -50px;
        padding: 25px;
      }
    `,
  ],
})
export class DetailsComponent implements OnInit {
  item!: Item;
  constructor(
    private activatedRoute: ActivatedRoute,
    private itemService: ItemService
  ) {
    activatedRoute.params.subscribe((params) => {
      if (params['id']) {
        this.itemService.getItemById(params['id']).subscribe((result) => {
          this.item = result;
        });
      }
    });
  }
  mapsUrl() {
    let latitude: string = this.item.lat as unknown as string;
    let longtude: string = this.item.lng as unknown as string;
    let url =
      'https://maps.google.com/maps?width=100%25&height=600&hl=en&q=' +
      latitude +
      ',' +
      longtude +
      '&t=&z=14&ie=UTF8&iwloc=B&output=embed';
    return url;
  }

  ngOnInit(): void {}
}
