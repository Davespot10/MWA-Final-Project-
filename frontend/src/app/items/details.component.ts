import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Item } from './item.model';
import { ItemService } from './item.service';

@Component({
  selector: 'app-details',
  template: `
    <div class="container">
      <div class="item-information">
        <h1>{{ item.postType }}</h1>
        <h3>{{ item.itemType }}</h3>
        <p>{{ item.description }}</p>
        <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit.</p>
        <p>{{ item.description }}</p>
        <p>{{ item.state }}</p>
      </div>
      <div class="google-map">
        <img
          mat-card-image
          src="https://images.ctfassets.net/16nm6vz43ids/1GwdOaWeHitrvRthtctmdL/5a6cb6e5208b474b61e8aaac0d8a5e02/How_to_find_lost_or_stolen_laptop.jpg"
          alt="laptop"
        />
      </div>
    </div>
  `,

  styles: [
    `
      .container {
        display: flex;
        flex-direction: row;
        flex-wrap: no-wrap;
        justify-content: space-around;
        align-items: center;
      }
      .google-map {
        position: absolute;
        align-items: center;
      }
      img {
        margin:auto;
        top:auto;
        margin-top: -60px;
      }
    `,
  ],
})
export class DetailsComponent implements OnInit {
  item!: Item;

  constructor(
    private activatedRoute: ActivatedRoute,
    private itemService: ItemService,
    private router: Router
  ) {
    activatedRoute.params.subscribe((params) => {
      if (params['id']) {
        this.itemService.getItemById(params['id']).subscribe((result) => {
          this.item = result;
          console.log(result);
        });
      }
    });
  }

  ngOnInit(): void {}
}
