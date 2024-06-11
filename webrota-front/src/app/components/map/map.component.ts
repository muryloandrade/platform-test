import { Component, OnInit } from '@angular/core';
import * as L from 'leaflet';
import { LatLngExpression } from 'leaflet';

@Component({
  selector: 'app-map',
  standalone: true,
  imports: [],
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css'],
})

export class MapComponent implements OnInit {
  private map: L.Map | undefined;

  ngOnInit(): void {
    this.map = L.map('map').setView([46.879966, -121.726909], 7);
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution:
        '© <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    }).addTo(this.map);

    const polygonPoints = [
      [46.879966, -121.726909],
      [46.879966, -121.726909 + 0.1],
      [46.879966 + 0.1, -121.726909 + 0.1],
    ];

    L.polygon(
      polygonPoints as
        | LatLngExpression[]
        | LatLngExpression[][]
        | LatLngExpression[][][],
      {
        color: 'blue',
        fillColor: 'lightblue',
        fillOpacity: 0.5,
      }
    ).addTo(this.map);
  }
}
