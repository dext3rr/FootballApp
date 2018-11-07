import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { Team } from '../_models/team';

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

getLeagueTeams(leagueId): Observable<Team[]> {
  return this.http.get<Team[]>(this.baseUrl + 'table/' + leagueId, httpOptions);
}

}
