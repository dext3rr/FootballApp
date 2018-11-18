import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { Team } from '../_models/team';
import { Season } from '../_models/Season';
import { SeasonTeam } from '../_models/SeasonTeam';

@Injectable({
  providedIn: 'root'
})
export class TableService {
  baseUrl = environment.apiUrl;

constructor(private http: HttpClient) { }

getSeasons(leagueId): Observable<Season[]> {
  return this.http.get<Season[]>(this.baseUrl + 'tables/seasons/' + leagueId);
}

getSeasonTeams(seasonId): Observable<SeasonTeam[]> {
  return this.http.get<SeasonTeam[]>(this.baseUrl + 'tables/seasonTeams/' + seasonId);
}

getLeagueTeams(leagueId): Observable<Team[]> {
  return this.http.get<Team[]>(this.baseUrl + 'tables/teams/' + leagueId);
}

}
