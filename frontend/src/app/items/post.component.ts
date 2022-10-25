import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ItemService } from 'src/app/items/item.service';
import { Item } from 'src/app/items/item.model';
import { PlaceSuggestion } from '../items/PlaceSuggestion';
import { MatSnackBar } from '@angular/material/snack-bar';
import User from '../user.interface';
import { UserService } from '../user.service';
@Component({
  selector: 'app-post',
  template: `<mat-stepper orientation="vertical" [linear]="true" #stepper>
    <mat-step [stepControl]="itemDetailsFormGroup">
      <form [formGroup]="itemDetailsFormGroup">
        <ng-template matStepLabel>Item Information</ng-template>
        <mat-form-field appearance="fill">
          <mat-label>Item Type</mat-label>
          <mat-select formControlName="itemType" placeholder="Ex. Dog" required>
            <mat-option value="Electronics">Electronics</mat-option>
            <mat-option value="Clothing">Clothing</mat-option>
            <mat-option value="Mobile">Mobile</mat-option>
            <mat-option value="ID_Card">ID Card</mat-option>
            <mat-option value="Jewelry">Jewelry</mat-option>
            <mat-option value="Keys">Keys</mat-option>
            <mat-option value="Pet">Pet</mat-option>
            <mat-option value="Bags">Bags</mat-option>
            <mat-option value="Luggage">Luggage</mat-option>
            <mat-option value="Books">Books</mat-option>
            <mat-option value="Others">Others</mat-option>
          </mat-select>
        </mat-form-field>
        <mat-form-field appearance="fill">
          <mat-label>Post Type</mat-label>
          <mat-select formControlName="postType" placeholder="Ex. Dog" required>
            <mat-option value="LOST">LOST</mat-option>
            <mat-option value="FOUND">FOUND</mat-option>
          </mat-select>
        </mat-form-field>
        <mat-form-field appearance="fill">
          <mat-label>Description</mat-label>
          <input
            matInput
            placeholder="Ex. I found or lost my item ..."
            formControlName="description"
            required
          />
        </mat-form-field>

        <mat-form-field appearance="fill">
          <mat-label>Upload Image</mat-label>
          <ngx-mat-file-input
            formControlName="imageUrl"
            required
            (change)="upload($event)"
            multiple
          ></ngx-mat-file-input>
          <mat-icon matSuffix>upload</mat-icon>
        </mat-form-field>
        <div>
          <button mat-raised-button color="primary" matStepperNext>Next</button>
        </div>
      </form>
    </mat-step>

    <mat-step [stepControl]="itemAddressFormGroup">
      <form>
        <ng-template matStepLabel>Location of Lost/Found </ng-template>
        <div fxLayout="row wrap" fxLayoutGap.gt-lg="16px grid">
          <div fxFlex="33%" fxFlex.xs="100%" fxFlex.sm="50%">
            <app-autocomplete
              class="autocomplete"
              (locationChange)="autocompleteChanged($event)"
            ></app-autocomplete>
          </div>
        </div>

        <div>
          <button
            mat-raised-button
            color="primary"
            matStepperPrevious
            class="stepper-btn"
          >
            Back
          </button>
          <button
            mat-raised-button
            color="primary"
            matStepperNext
            class="stepper-btn"
          >
            Next
          </button>
        </div>
      </form>
    </mat-step>

    <mat-step>
      <ng-template matStepLabel>Done</ng-template>
      <p>You are almost done, click submit to Finish</p>
      <div>
        <button
          mat-raised-button
          color="primary"
          matStepperPrevious
          class="stepper-btn"
        >
          Back
        </button>
        <button
          *ngIf="!submit"
          mat-raised-button
          (click)="postItem()"
          color="accent"
          class="stepper-btn"
        >
          Submit
        </button>
        <mat-progress-bar
          mode="indeterminate"
          *ngIf="submit"
        ></mat-progress-bar>
      </div>
    </mat-step>
  </mat-stepper> `,
  styles: [
    `

      mat-stepper {
        display: inline;
        justify-content: space-evenly;
        align-items: center;
        padding-left: 20px;
        margin-left: 50px;
      }
      mat-radio-group {
        display: flex;
        justify-content: space-evenly;
      }

      mat-form-field {
        width: 40%;
        padding: 10px;
      }
      .auto-container {
        display: flex;
        flex-wrap: wrap;
        justify-content: center;
        align-items: center;
        width: 100%;
      }
      .stepper-btn {
        margin-right: 10px;
        padding-right: 10px;
      }
    `,
  ],
})
export class PostComponent implements OnInit, OnDestroy {
  app_state: User = {
    _id: '',
    first_name: '',
    last_name: '',
    email: '',
    phone_number: '',
    token: '',
  };
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
    }
  }
  ngOnInit(): void {
    this.userService.userState.subscribe((state: User) => {
      this.app_state = state;
      console.log(this.app_state.email);
    });
  }

  submit = false;
  selectFiles = '';
  address = '';
  ITEM_TYPE = [

    "Electronics",
    "Clothing",
    "Mobile",
    "ID_Card",
    "Jewelry",
    "Keys",
    "Pet",
    "Bags",
    "Luggage",
    "Books",
    "Others",
  ]

  POST_TYPE = ['LOST', 'FOUND'];

  itemDetailsFormGroup = this.fb.group({
    itemType: ['', [Validators.required]],
    postType: ['', [Validators.required]],
    description: ['', [Validators.required]],
    imageUrl: [null, [Validators.required]],
  });

  itemAddressFormGroup = this.fb.group({
    address: [''],
  });
  userInfoFormGroup = this.fb.group({
    firstName: ['', [Validators.required]],
    lastName: ['', [Validators.required]],
    email: ['', [Validators.required]],
    phone: [''],
  });
  items: Item[] = [];

  postItem() {
    this.submit = true;
    let item = {
      itemType: this.itemDetailsFormGroup.value.itemType as string,
      postType: this.itemDetailsFormGroup.value.postType as string,
      description: this.itemDetailsFormGroup.value.description as string,
      imageUrl: this.selectFiles,
      address: this.address,
      firstName: this.app_state.first_name,
      lastName: this.app_state.last_name,
      email: this.app_state.email,
      phone: this.app_state.phone_number,
    } as Item;

    this.itemService.postItem(item).subscribe((result) => {
      this._snackBar.open('Item posted successfully ', ' ', {
        duration: 1000,
      });
      console.log(item);

      this.submit = false;
      this.router.navigateByUrl('/');


    });
  }
  upload(event: any) {
    const file = event.target.files[0];
    this.selectFiles = file.name;
    return this.itemService.uploadImage(file).subscribe((item) => {
      console.log('File upload success ');
    });
  }
  ngOnDestroy(): void {

    throw new Error('Method not implemented.');

  }

  autocompleteChanged(value: PlaceSuggestion) {
    this.address = value.shortAddress;
    console.log('value is changing here', this.address);
  }
}
