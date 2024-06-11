import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { IAreas } from './models/IAreas';

@Injectable({
  providedIn: 'root',
})
export class AreasService {
  constructor(private http: HttpClient) {}

  private readonly AreasArray: IAreas[] = [];

  getApiAreas() {
    return this.http.get<IAreas[]>(
      'https://jsonplaceholder.typicode.com/Areass'
    );
  }

  addApiAreas(Areas: IAreas) {
    return this.http.post<IAreas>(
      'https://jsonplaceholder.typicode.com/Areass',
      Areas
    );
  }

  getAllAreass(): IAreas[] {
    return this.AreasArray;
  }
}
