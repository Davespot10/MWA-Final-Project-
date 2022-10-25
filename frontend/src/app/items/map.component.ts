import { Component, OnInit } from '@angular/core';
import * as L from 'leaflet';
import { MapService } from './map.service';

@Component({
  selector: 'app-map',
  template: `
    <div class="map-container">
      <div class="map-frame">
        <div id="map" style="width: 900px; height: 580px"></div>
      </div>
    </div>
  `,
  styles: [
    `
      #map {
        height: 600px;
        width: 100%;
      }
    `,
  ],
})
export class MapComponent implements OnInit {
  private map!: L.Map;
  private latitude = 0 ;
  private longitude = 0;

  public initMap(lat: number, lng: number): void {
    this.map = L.map('map', {
      center: [(this.latitude = lat), (this.latitude = lng)],
      zoom: 1,
    });

    const layer = L.tileLayer(
      'http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
    );

    this.map.addLayer(layer);

    L.marker([this.latitude, this.longitude]).addTo(this.map);
  }

  constructor(public mapService: MapService) {}

  ngOnInit(): void {
    this.mapService.currentLocation.subscribe((message) => {
      this.latitude = message.coordinates[0];
      this.longitude = message.coordinates[1];
    });
    this.initMap(this.latitude, this.longitude);
  }
}
