import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Fixture } from '../_models/Fixture';

@Injectable({
  providedIn: 'root'
})
export class FixtureService {
  baseUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }

  getSeasonFixtures(id): Observable<Fixture[]> {
    return this.http.get<Fixture[]>(this.baseUrl + 'fixtures/' + id);
  }

  getFixture(id): Observable<Fixture> {
    return this.http.get<Fixture>(this.baseUrl + 'fixtures/details/' + id);
  }

  addFixture(model: any) {
    return this.http.post<Fixture>(this.baseUrl + 'fixtures/addFixture', model);
  }

  deleteFixture(id: number) {
    return this.http.delete<Fixture>(this.baseUrl + 'fixtures/' + id + '/deleteFixture');
  }
}


