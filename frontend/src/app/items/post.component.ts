import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ItemService } from 'src/app/items/item.service';
import { Item } from 'src/app/items/item.model';
import { PlaceSuggestion } from '../items/PlaceSuggestion';
import { MatSnackBar } from '@angular/material/snack-bar';
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
            <mat-option value="IdCards">ID Card</mat-option>
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
    <mat-step [stepControl]="userInfoFormGroup">
      <form [formGroup]="userInfoFormGroup">
        <ng-template matStepLabel>User Information </ng-template>
        <mat-form-field appearance="fill">
          <mat-label>First Name </mat-label>
          <input
            matInput
            placeholder="Ex. John"
            formControlName="firstName"
            required
          />
        </mat-form-field>
        <mat-form-field appearance="fill">
          <mat-label>Last Name </mat-label>
          <input
            matInput
            placeholder="Ex. Doe"
            formControlName="lastName"
            required
          />
        </mat-form-field>
        <mat-form-field appearance="fill">
          <mat-label>Email</mat-label>
          <input
            matInput
            placeholder="Ex. john@example.com"
            formControlName="email"
            required
          />
        </mat-form-field>
        <mat-form-field appearance="fill">
          <mat-label>Phone</mat-label>
          <input matInput placeholder="Ex. 4657896" formControlName="phone" />
        </mat-form-field>
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
  submit = false;
  selectFiles = '';
  address = '';
  ITEM_TYPE = [
    'Electronics',
    'Clothing',
    'Mobile',
    'ID Card',
    'Jewelry',
    'Keys',
    'Pet',
    'Bags',
    'Luggage',
    'Books',
    'Others',
  ];
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
  constructor(
    private fb: FormBuilder,
    private itemService: ItemService,
    private router: Router,
    private _snackBar: MatSnackBar
  ) {}

  postItem() {
    this.submit = true;
    let item = {
      itemType: this.itemDetailsFormGroup.value.itemType as string,
      postType: this.itemDetailsFormGroup.value.postType as string,
      description: this.itemDetailsFormGroup.value.description as string,
      imageUrl: this.selectFiles,
      address: this.address,
      firstName: this.userInfoFormGroup.value.firstName as string,
      lastName: this.userInfoFormGroup.value.lastName as string,
      email: this.userInfoFormGroup.value.email as string,
      phone: this.userInfoFormGroup.value.phone as string,

    } as Item;

    this.itemService.postItem(item).subscribe((result) => {
      this._snackBar.open('Item posted successfully ' ,' ',{
        duration:1000
      });
      console.log(result);
      this.router.navigateByUrl('/');
      this.submit = false;
    });
  }
  upload(event: any) {
    const file = event.target.files[0];
    this.selectFiles = file.name;
    return this.itemService.uploadImage(file).subscribe((item) => {
      console.log('My File name is ', file.name);
    });
    this.selectFiles = event.target.files[0].name;


  }
  ngOnDestroy(): void {

    throw new Error('Method not implemented.');
  }
  autocompleteChanged(value: PlaceSuggestion) {
    this.address = value.shortAddress
    console.log('value is changing here',this.address );
  }

  ngOnInit(): void {}
}
