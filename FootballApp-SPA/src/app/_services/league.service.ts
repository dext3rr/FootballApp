import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { League } from '../_models/League';

const httpOptions = {
  headers: new HttpHeaders({
    'Authorization': 'Bearer ' + localStorage.getItem('token')
  })
};

@Injectable({
  providedIn: 'root'
})
export class LeagueService {
  baseUrl = environment.apiUrl;

constructor(private http: HttpClient) { }

  getLeagues(): Observable<League[]> {
    return this.http.get<League[]>(this.baseUrl + 'leagues', httpOptions);
  }

  getLeague(id): Observable<League> {
    return this.http.get<League>(this.baseUrl + 'leagues/' + id, httpOptions);
  }

}
