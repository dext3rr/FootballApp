import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { SeasonTeam } from '../_models/SeasonTeam';
import { Team } from '../_models/team';

@Injectable({
  providedIn: 'root'
})
export class SeasonTeamsService {
  baseUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }

  getAllSeasonsTeams(): Observable<SeasonTeam[]> {
    return this.http.get<SeasonTeam[]>(this.baseUrl + 'seasonsTeams/');
  }

  getSeasonTeams(seasonId): Observable<SeasonTeam[]> {
    return this.http.get<SeasonTeam[]>(this.baseUrl + 'seasonsTeams/season/' + seasonId);
  }

  getSeasonTeam(seasonId, teamId): Observable<SeasonTeam> {
    return this.http.get<SeasonTeam>(this.baseUrl + 'seasonsTeams/season/' + seasonId + '/team/' + teamId);
  }

  updateSeasonTeam(id: number, seasonTeam: SeasonTeam) {
    return this.http.put(this.baseUrl + 'tables/team/' + id, seasonTeam);
  }

  generateTeams(seasonId, teams: Team[]) {
    return this.http.post(this.baseUrl + 'seasonsTeams/season/' + seasonId + '/generateTeams', teams);
  }

  deleteTeams(seasonId, teams) {
    return this.http.delete(this.baseUrl + 'seasonsTeams/season/' + seasonId + '/deleteTeams', teams);
  }
}
