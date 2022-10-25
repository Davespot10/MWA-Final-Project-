import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-not-found',
  template: `<google-map
      height="400px"
      width="750px"
      [center]="center"
      [zoom]="zoom"
      (mapClick)="moveMap($event)"
      (mapMousemove)="move($event)"
    >
    </google-map>

    <div>Latitude: {{ display?.lat }}</div>
    <div>Longitude: {{ display?.lng }}</div>`,
  styles: [``],
})
export class NotFoundComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}
  display: any;
  center: google.maps.LatLngLiteral = {
    lat: 24,
    lng: 12,
  };
  zoom = 4;
  moveMap(event: google.maps.MapMouseEvent) {
    if (event.latLng != null) this.center = event.latLng.toJSON();
  }
  move(event: google.maps.MapMouseEvent) {
    if (event.latLng != null) this.display = event.latLng.toJSON();
  }
}
