import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ItemService } from 'src/app/items/item.service';
import { Item } from 'src/app/items/item.model';
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
      <form [formGroup]="itemAddressFormGroup">
        <ng-template matStepLabel>Location of Lost/Found </ng-template>
        <mat-form-field appearance="fill">
          <mat-label>state</mat-label>
          <input
            matInput
            placeholder="Ex. IOWA"
            formControlName="state"
            required
          />
        </mat-form-field>
        <mat-form-field appearance="fill">
          <mat-label>City</mat-label>
          <input
            matInput
            placeholder="Ex. Fairfield"
            formControlName="city"
            required
          />
        </mat-form-field>
        <mat-form-field appearance="fill">
          <mat-label>Street</mat-label>
          <input
            matInput
            placeholder="Ex. 1000Nth street"
            formControlName="street"
            required
          />
        </mat-form-field>
        <mat-form-field appearance="fill">
          <mat-label>Zip Code</mat-label>
          <input
            matInput
            placeholder="Ex. 557525"
            formControlName="zipcode"
            required
          />
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
      <p>You are Almost DONE, click submit to Finish</p>
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
      /* .example-container .mat-form-field + .mat-form-field {
    margin-left: 8px;
  } */
      mat-stepper {
        display: inline;
        justify-content: space-evenly;
        align-items: center;
        padding-left: 20px;
        margin-left: 50px;
        /* flex-direction: column; */
      }
      mat-radio-group {
        display: flex;
        justify-content: space-evenly;
      }

      mat-form-field {
        width: 40%;
        padding: 10px;
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
  selectFiles='';
  lat = 224455;
  lng = 102030;
  ownerId = 20;
  ITEM_TYPE = [
    'Electronics',
    'Clothing',
    'Mobile',
    'IdCards',
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
  // optional requirements we can implement multiple image upload this if we have time
  itemImagesFormGroup = this.fb.group({
    imageUrl2: [],
    imageUrl3: [],
    imageUrl4: [],
  });

  itemAddressFormGroup = this.fb.group({
    state: ['', [Validators.required]],
    city: ['', [Validators.required]],
    street: ['', [Validators.required]],
    zipcode: ['', [Validators.required]], // to be validated Validators.pattern('(^\d{5}$)|(^\d{9}$)|(^\d{5}-\d{4}$)')]
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
    private router: Router


  ) {}

  postItem() {
    this.submit = true;
    let item = {
      itemType: this.itemDetailsFormGroup.value.itemType as string,
      postType: this.itemDetailsFormGroup.value.postType as string,
      description: this.itemDetailsFormGroup.value.description as string,
      imageUrl: this.selectFiles,
      state: this.itemAddressFormGroup.value.state as string,
      city: this.itemAddressFormGroup.value.city as string,
      street: this.itemAddressFormGroup.value.street as string,
      zipcode: this.itemAddressFormGroup.value.zipcode as string,
      firstName: this.userInfoFormGroup.value.firstName as string,
      lastName: this.userInfoFormGroup.value.lastName as string,
      email: this.userInfoFormGroup.value.email as string,
      phone: this.userInfoFormGroup.value.phone as string,
      lat: this.lat as number,
      lng: this.lng as number,
      ownerId: this.ownerId as number,
    } as Item;

    this.itemService.postItem(item).subscribe((result) => {
      // this.snackBar.open('Item posted successfully ' ,' ',{
      //   duration:1000
      // });
      console.log(result);
      this.router.navigateByUrl('/');
      this.submit = false;
    });
  }
  upload(event: any) {

  const files = event.target.files[0];

 this.selectFiles = files.name;
  }
  ngOnDestroy(): void {
    // cleanup and un subscription to be done here
    throw new Error('Method not implemented.');
  }

  ngOnInit(): void {}
}
