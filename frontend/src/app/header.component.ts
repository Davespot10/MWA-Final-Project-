import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import User from './user.interface';
import { UserService } from './user.service';

@Component({
  selector: 'app-header',
  template: `
  <mat-toolbar color="primary" class="mat-elevation-z8">
      <a [routerLink]="['']" routerLink="" mat-button>
        <mat-icon  class="ecology">eco</mat-icon>
      </a>
      <span class="brandName">LF</span>

      <div class="spacer"></div>

      <p  *ngIf="app_state.token">Welcome</p>
      &nbsp;
      <p class="wellcome" *ngIf="app_state.token">{{app_state.first_name}}</p>

      <div class="spacer"></div>
      <button  [routerLink]="['']" mat-button>Home</button>
      <button *ngIf="app_state.token" [routerLink]="['login']" [routerLink]="['/items/create']" mat-button>Create</button>

      <button  [routerLink]="['register']" mat-raised-button color="green" >signup</button>
      &nbsp;
      <button *ngIf="!app_state.token" [routerLink]="['login']" mat-raised-button color="green" >logIn</button>
      &nbsp;
      <button *ngIf="app_state.token" mat-raised-button (click)="logout()" >Logout</button>


    </mat-toolbar>



  `,
  styles: [
    `

      .spacer {
        flex: 1 1 auto;
      }
      .ecology {
        transform: scale(3);
      }
      .brandName {
      font-family: 'Pacifico', cursive;
      font-weight: bold;
      margin-left: 5px;
      color:yellow
    }
    .wellcome{
      color:chartreuse;
      font-family: 'Pacifico', cursive;

    }
    `,
  ],
})
export class HeaderComponent implements OnInit {



  app_state: User = {
    _id: "",
    first_name: '',
    last_name:"",
    email: "",
    phone_number: "",
    token:""


  }

  title = 'Lost_and_found';
  constructor(private userService: UserService, private router: Router) {


    const stringified_app_state = localStorage.getItem("APP_STATE")


    if (stringified_app_state) {
      const parsed_app_state=JSON.parse(stringified_app_state)
      this.userService.userState.next(parsed_app_state)

      this.app_state = parsed_app_state;
     ;
    }
  }
  ngOnInit(): void {
    this.userService.userState.subscribe((state: User) => {
      this.app_state = state;



    })
  }
  logout() {
    this.userService.userState.next({
      _id: "",
      first_name: '',
      last_name:"",
      email: "",
      phone_number: "",
      token:""
    })
    localStorage.clear();
    this.router.navigate(["login"])


  }

}
