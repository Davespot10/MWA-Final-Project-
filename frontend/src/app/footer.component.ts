import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import User from './user.interface';
import { UserService } from './user.service';
@Component({
  selector: 'app-footer',
  template: `
  <mat-toolbar color="primary" class="">
      
      <span class="footer">All rights reserved-L&F</span>

      <div class="spacer"></div>

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
      .footer {
      font-family: 'Pacifico', cursive;
      font-weight: bold;
      margin-left: 5px;
      position: absolute;
      bottom: 0;
      color:yellow
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
