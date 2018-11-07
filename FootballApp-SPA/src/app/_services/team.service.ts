import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Team } from '../_models/Team';
import { Player } from '../_models/Player';

const httpOptions = {
  headers: new HttpHeaders({
    'Authorization': 'Bearer ' + localStorage.getItem('token')
  })
};


@Injectable({
  providedIn: 'root'
})
export class TeamService {
  baseUrl = environment.apiUrl;

constructor(private http: HttpClient) { }

 getTeams(): Observable<Team[]> {
   return this.http.get<Team[]>(this.baseUrl + 'teams', httpOptions);
 }

 getTeam(id): Observable<Team> {
   return this.http.get<Team>(this.baseUrl + 'teams/' + id, httpOptions);
 }

  getPlayers(teamId): Observable<Player[]> {
   return this.http.get<Player[]>(this.baseUrl + 'teams/' + teamId + '/players', httpOptions);
 }
}