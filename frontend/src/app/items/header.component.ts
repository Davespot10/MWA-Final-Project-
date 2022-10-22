import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  template: `
    <mat-toolbar color="primary" class="mat-elevation-z8">
      <a routerLink="" mat-button>
        <mat-icon class="ecology">eco</mat-icon>
      </a>
      <div class="spacer"></div>
      <a routerLink="/" mat-button>Home</a>
      <a routerLink="/items/create" mat-button>create</a>
      <a routerLink="/items/views" mat-button>View</a>
      <a routerLink="/login" mat-button>Login</a>
      <a routerLink="/register" mat-raised-button color="accent">Register</a>
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
    `,
  ],
})
export class HeaderComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}
}
