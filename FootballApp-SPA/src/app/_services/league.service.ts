import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { League } from '../_models/League';

@Injectable({
  providedIn: 'root'
})
export class LeagueService {
  baseUrl = environment.apiUrl;

constructor(private http: HttpClient) { }

  getLeagues(): Observable<League[]> {
    return this.http.get<League[]>(this.baseUrl + 'leagues');
  }

  getLeague(id): Observable<League> {
    return this.http.get<League>(this.baseUrl + 'leagues/' + id);
  }

  getAreaLeagues(id): Observable<League[]> {
    return this.http.get<League[]>(this.baseUrl + 'leagues/arealeagues/' + id);
  }

  addLeague(model: any) {
    return this.http.post<League>(this.baseUrl + 'leagues/addLeague', model);
  }
}
