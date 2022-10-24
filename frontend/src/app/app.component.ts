import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import User from './user.interface';

import { UserService } from './user.service';


@Component({
  selector: 'app-root',
  template: `
  <app-header></app-header>
<router-outlet></router-outlet>

  `
 
})
export class AppComponent  {


}
