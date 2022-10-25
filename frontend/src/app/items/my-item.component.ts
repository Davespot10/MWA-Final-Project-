import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import User from '../user.interface';
import { UserService } from '../user.service';
import { Item } from './item.model';
import { ItemService } from './item.service';
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
      <div fxLayout="row wrap" fxLayoutGap.gt-lg="16px grid">
        <div
          fxFlex="33%"
          fxFlex.xs="100%"
          fxFlex.sm="50%"
          *ngFor="let item of items | searchText: searchItems"
        >
          <a routerLink="/items/{{ item._id }}">
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
        margin: 15px;
        padding: 20px;
        border-radius: 10px;
        cursor: pointer;
        text-align: center;
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
export class MyItemComponent implements OnInit {
  app_state: User = {
    _id: '',
    first_name: '',
    last_name: '',
    email: '',
    phone_number: '',
    token: '',
  };

  items: Item[] = [];
  searchItems: string = '';
  constructor(
    private fb: FormBuilder,
    private itemService: ItemService,
    private router: Router,
    private userService: UserService,
    private _snackBar: MatSnackBar
  ) {
    const stringified_app_state = localStorage.getItem('APP_STATE');

    if (stringified_app_state) {
      const parsed_app_state = JSON.parse(stringified_app_state);
      this.userService.userState.next(parsed_app_state);

      this.app_state = parsed_app_state;
      this.userService.userState.subscribe((state: User) => {
        this.app_state = state;
      });
    }
  }

  ngOnInit(): void {
    this.getMyItems();
  }

  getMyItems() {
    this.itemService.getMyItems(this.app_state.email).subscribe({
      next: (result: Item[]) => {
        this.items = result;
        console.log(this.items);
      },
      error: (err: any) => {
        console.log(err);
      },
    });
  }
}
