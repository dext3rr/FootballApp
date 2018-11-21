import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Area } from '../_models/Area';

@Injectable({
  providedIn: 'root'
})
export class AreaService {
  baseUrl = environment.apiUrl;

constructor(private http: HttpClient) { }

getAreas(): Observable<Area[]> {
  return this.http.get<Area[]>(this.baseUrl + 'areas');
}

getArea(id): Observable<Area> {
  return this.http.get<Area>(this.baseUrl + 'areas/' + id);
}

addArea(model: any) {
  return this.http.post<Area>(this.baseUrl + 'areas/addArea', model);
}

deleteArea(id: number) {
  return this.http.delete<Area>(this.baseUrl + 'areas/' + id + '/deleteArea');
}
}
