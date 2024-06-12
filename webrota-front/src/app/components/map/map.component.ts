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
  private markersLayer: L.LayerGroup = L.layerGroup(); // LayerGroup para armazenar os marcadores

  constructor(private httpClient: HttpClient) {}

  zoomIn() {
    if (this.map) this.map.zoomIn();
  }

  zoomOut() {
    if (this.map) this.map.zoomOut();
  }

  centerMap() {
    if (this.map) this.map.setView([-18.9220717, -48.2636901], 15);
  }

  logout() {
    window.location.href = '/login';
  }

  ngOnInit(): void {
    this.map = L.map('map').setView([-18.9220717, -48.2636901], 15);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      id: 'mapbox.streets',
      tileSize: 512,
      zoomOffset: -1,
    }).addTo(this.map);

    // Removendo o controle de zoom padrão
    this.map.zoomControl.remove();

    var endpointUrl = 'http://localhost:5000/getMarkers';
    var customIcon = L.icon({
      iconUrl:
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQtQUuJDc3fJPhaCnIaIW4QMDvYPNGefdlOog&s',
      iconSize: [30, 25], // Tamanho do ícone
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
            if (this.map) {
              L.marker([lat, long], { icon: customIcon }).addTo(
                this.markersLayer
              ); // Adiciona marcadores à camada de marcadores
            }
          });
          if (this.map)
            L.polyline(polygonPoints, {
              color: 'black',
              weight: 8,
            }).addTo(this.map); // Adiciona a linha entre os marcadores ao mapa
          if (this.map) this.markersLayer.addTo(this.map); // Adiciona a camada de marcadores ao mapa
        } else {
          console.error('Data is not an array:', data);
        }
      },
      (error) => {
        console.error('Error fetching data:', error);
        alert('Erro ao buscar marcadores');
      }
    );
  }
}
