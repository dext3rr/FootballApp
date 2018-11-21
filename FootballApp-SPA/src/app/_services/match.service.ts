import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Match } from '../_models/Match';

@Injectable({
  providedIn: 'root'
})
export class MatchService {
  baseUrl = environment.apiUrl;

constructor(private http: HttpClient) { }

  getFixtureMatches(id): Observable<Match[]>{
    return this.http.get<Match[]>(this.baseUrl + 'matches/' + id);
  }

  getMatch(id): Observable<Match> {
    return this.http.get<Match>(this.baseUrl + 'matches/' + id + '/details');
  }

  addMatch(model: any) {
    return this.http.post<Match>(this.baseUrl + 'matches/addMatch', model);
  }

  deleteMatch(id: number) {
    return this.http.delete<Match>(this.baseUrl + 'matches/' + id + '/deleteMatch');
  }

}
