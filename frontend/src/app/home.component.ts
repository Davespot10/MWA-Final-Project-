import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  template: `

<div class="bg"></div>

   `
  ,
  styles: [`
  .bg {
  background-image: url("https://st4.depositphotos.com/14431644/20903/i/450/depositphotos_209037406-stock-photo-text-sign-showing-lost-found.jpg");
  height: 100%; 
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
}
  
  
  
  `]
})
export class HomeComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}
}
