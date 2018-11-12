import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { Team } from '../_models/team';
import { Season } from '../_models/Season';

const httpOptions = {
  headers: new HttpHeaders({
    'Authorization': 'Bearer ' + localStorage.getItem('token')
  })
};


@Injectable({
  providedIn: 'root'
})
export class TableService {
  baseUrl = environment.apiUrl;

constructor(private http: HttpClient) { }

getSeasons(leagueId): Observable<Season[]> {
  return this.http.get<Season[]>(this.baseUrl + 'tables/seasons/' + leagueId, httpOptions);
}

getSeasonTeams(seasonId): Observable<Team[]> {
  return this.http.get<Team[]>(this.baseUrl + 'tables/seasonTeams/' + seasonId, httpOptions);
}

}
