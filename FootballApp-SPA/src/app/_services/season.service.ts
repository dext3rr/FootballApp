import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Season } from '../_models/Season';

@Injectable({
  providedIn: 'root'
})
export class SeasonService {
  baseUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }

  getSeasons(): Observable<Season[]> {
    return this.http.get<Season[]>(this.baseUrl + 'seasons/');
  }

  getSeason(id): Observable<Season[]> {
    return this.http.get<Season[]>(this.baseUrl + 'seasons/' + id);
  }

  getLeagueSeasons(leagueId): Observable<Season[]> {
    return this.http.get<Season[]>(this.baseUrl + 'seasons/league/' + leagueId);
  }

  addSeason(model: any) {
    return this.http.post<Season>(this.baseUrl + 'seasons/addSeason', model);
  }

  editSeason(id: number, season: Season) {
    return this.http.put<Season>(this.baseUrl + 'seasons/' + id, season);
  }

  deleteSeason(id) {
    return this.http.delete<Season>(this.baseUrl + 'seasons/' + id + '/deleteSeason');
  }
}
