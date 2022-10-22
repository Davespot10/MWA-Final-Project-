import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-item',
  template: `
  <!-- component to display items using *ngFor --needs some styling  -->
    <mat-card class="item-card">
      <mat-card-header>
        <mat-card-title>Lost </mat-card-title>
      </mat-card-header>
      <mat-card-content>
        <img
          mat-card-image
          src="https://images.ctfassets.net/16nm6vz43ids/1GwdOaWeHitrvRthtctmdL/5a6cb6e5208b474b61e8aaac0d8a5e02/How_to_find_lost_or_stolen_laptop.jpg"
          alt="laptop"
        />
        <p>Any one has seen it!</p>
      </mat-card-content>
      <mat-card-actions> </mat-card-actions>
    </mat-card> `,
  styles: [
    `
      img,
      .mat-card-image {
        width: 350px;
        height: 350px;
        border-radius: 10px;

        object-fit: cover;
        margin: 0px !important;
      }
      mat-card-avatar {
        text-align: center;
      }

      .mat-card-content {
        width: 300px;
        height: 350px;
      }
      .item-card {
        /* background-color: transparent; */
        cursor: pointer;
      }
    `,
  ],
})
export class ItemComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}
}
