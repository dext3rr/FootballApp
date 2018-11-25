import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Card } from '../_models/Card';

@Injectable({
  providedIn: 'root'
})
export class CardService {
  baseUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }

  getCard(id): Observable<Card> {
    return this.http.get<Card>(this.baseUrl + 'cards/' + id);
  }

  getMatchCards(id): Observable<Card[]> {
    return this.http.get<Card[]>(this.baseUrl + 'cards/' + id + '/matchCards');
  }

  addCard(model: any) {
    return this.http.post<Card>(this.baseUrl + 'cards/addCard', model);
  }

  deleteCard(id: number) {
    return this.http.delete<Card>(this.baseUrl + 'cards/' + id + '/deleteCard');
  }
}
