import { Component, OnInit } from '@angular/core';
import * as L from 'leaflet';
import { LatLngExpression } from 'leaflet';
import { HttpClient } from '@angular/common/http';
import { HttpClientModule } from '@angular/common/http';
import { IMarker } from '../../models/IMarker';


@Component({
  selector: 'app-map',
  standalone: true,
  imports: [HttpClientModule],
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css'],
})
export class MapComponent implements OnInit {
  private map: L.Map | undefined;

  constructor(private httpClient: HttpClient) {}

  ngOnInit(): void {
    this.map = L.map('map').setView([46.879966, -121.726909], 7);
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution:
        '© <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    }).addTo(this.map);

    var endpointUrl = 'http://localhost:5000/getMarkers';
    var customIcon = L.icon({
      iconUrl: 'https://www.pngall.com/wp-content/uploads/2017/05/Map-Marker-Free-Download-PNG.png',
      iconSize: [50, 50], // Tamanho do ícone
    });
    const polygonPoints: [number, number][] = [];

    this.httpClient.get<IMarker[]>(endpointUrl).subscribe(
      (data) => {
        console.log(data);
        if (Array.isArray(data)) {
          data.map((marker) => {
            var lat = Number(marker.latitude);
            var long = Number(marker.longitude);
            polygonPoints.push([lat, long]);
            if (this.map) L.marker([lat, long], { icon: customIcon }).addTo(this.map);

          });
        } else {
          console.error('Data is not an array:', data);
        }
      },
      (error) => {
        console.error('Error fetching data:', error);
      }
    );




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
