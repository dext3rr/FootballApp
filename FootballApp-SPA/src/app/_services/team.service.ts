import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Team } from '../_models/Team';
import { Player } from '../_models/Player';

@Injectable({
  providedIn: 'root'
})
export class TeamService {
  baseUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }

  getTeams(): Observable<Team[]> {
    return this.http.get<Team[]>(this.baseUrl + 'teams');
  }

  getLeagueTeams(leagueId): Observable<Team[]> {
    return this.http.get<Team[]>(this.baseUrl + 'teams/league/' + leagueId);
  }

  getTeam(id): Observable<Team> {
    return this.http.get<Team>(this.baseUrl + 'teams/' + id);
  }

  addTeam(model: any) {
    return this.http.post<Team>(this.baseUrl + 'teams/addTeam', model);
  }

  updateTeam(id: number, team: Team) {
    return this.http.put(this.baseUrl + 'teams/' + id, team);
  }

  deleteTeam(id: number) {
    return this.http.delete<Team>(this.baseUrl + 'teams/' + id + '/deleteTeam');
  }

  getPlayers(teamId): Observable<Player[]> {
    return this.http.get<Player[]>(this.baseUrl + 'teams/' + teamId + '/players');
  }

  likeTeam(userId: number, teamId: number) {
    return this.http.post(this.baseUrl + 'users/' + userId + '/teamLike/' + teamId, {});
  }

  getLikedTeams(userId: number) {
    return this.http.get(this.baseUrl + 'users/' + userId + '/likedTeams');
  }

}
