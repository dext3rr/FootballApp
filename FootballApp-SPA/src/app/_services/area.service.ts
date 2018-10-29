import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Area } from '../_models/Area';

const httpOptions = {
  headers: new HttpHeaders({
    'Authorization': 'Bearer ' + localStorage.getItem('token'),
  })
};


@Injectable({
  providedIn: 'root'
})
export class AreaService {
  baseUrl = environment.apiUrl;

constructor(private http: HttpClient) { }

getAreas(): Observable<Area[]> {
  return this.http.get<Area[]>(this.baseUrl + 'areas', httpOptions);
}

getArea(id): Observable<Area> {
  return this.http.get<Area>(this.baseUrl + 'areas/' + id, httpOptions);
}
}
