import { Component, OnInit } from '@angular/core';
import * as L from 'leaflet';


@Component({
  selector: 'app-map',
  template: `
<div class="map-container">
    <div class="map-frame">
    <div id = "map" style = "width: 900px; height: 580px">
    </div>
  </div>


  `,
  styles: [
    `
    #map{
      height:600px;
      width:100%;
    }
    `,
  ],
})
export class MapComponent implements OnInit {

  private map!: L.Map;
  private centroid: L.LatLngExpression = [42.3601, -71.0589]; //

  private initMap(): void {
    this.map = L.map('map', {
      center: this.centroid,
      zoom: 12,
    });

 const layer = L.tileLayer(
  'http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png')

      this.map.addLayer(layer);

      L.marker([42.3601, -71.0589]).addTo(this.map)
  };


  constructor() {}

  ngOnInit(): void {
    this.initMap();
  }
}
