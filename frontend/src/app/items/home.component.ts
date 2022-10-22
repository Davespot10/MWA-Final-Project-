import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  template: `<img
    id="headImg"
    src="https://images.unsplash.com/photo-1547322268-f6935f1ae1e1?ixlib=rb-4.0.3&dl=vanderley-goncalves-fbZKx1x9ips-unsplash.jpg&w=2400&q=80&fm=jpg&crop=entropy&cs=tinysrgb
  "
    alt="Header Image"
  /> `,
})
export class HomeComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}
}
