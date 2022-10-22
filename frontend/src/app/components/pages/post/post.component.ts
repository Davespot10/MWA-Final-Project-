import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ItemService } from 'src/app/services/item.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Item } from 'src/app/models/item.model';
import { NumberFormatStyle } from '@angular/common';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css'],
})
export class PostComponent implements OnInit, OnDestroy {
  submit = false;
  selectFiles = '';
  lat = 224455;
  lng = 102030;
  ownerId=20;
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
  ) // private snackBar: MatSnackBar
  {}

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
      ownerId:this.ownerId as number
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
  upload(event:any){
    const files = event.target.files[0];
    this.selectFiles = files.name;

  }
  ngOnDestroy(): void {
    // cleanup and un subscription to be done here
    throw new Error('Method not implemented.');
  }

  ngOnInit(): void {}
}
