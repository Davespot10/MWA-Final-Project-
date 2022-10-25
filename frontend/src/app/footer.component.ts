import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import User from './user.interface';
import { UserService } from './user.service';
@Component({
  selector: 'app-footer',
  template: `
  <mat-toolbar color="primary" class="footer">
    
      
      
  <a routerLink="" class="about">
      <span > About us</span>
      </a>
      <span class="footer-text">All rights reserved-L&F</span>
     
      <a  routerLink="" class="contact">
      <span >Contact</span>
      </a>
      <div class="spacer"></div>

    </mat-toolbar>



  `,
  styles: [
    `
   
      .spacer {
        flex: 1 1 auto;
      }
     
      .footer {
     
      position: fixed;
      bottom: 0;
     
    }

    .footer-text{
      font-family: 'Pacifico', cursive;
      font-size: 12px;
      margin-left: 580px;
      position: absolute;
      bottom: 5;
      color:yellow
    }
    
    .about{
      font-family: 'Pacifico', cursive;
      font-weight: bold;
      margin-left: 250px;
      position: absolute;
      bottom: 5;
      color:white
    }

    .contact{
      font-family: 'Pacifico', cursive;
      font-weight: bold;
      margin-left: 950px;
      position: absolute;
      bottom: 5;
      color:white
    }
    
   
    `,
  ],
})
export class FooterComponent implements OnInit {

  

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
