import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Player } from '../_models/Player';

@Injectable({
  providedIn: 'root'
})
export class PlayerService {
  baseUrl = environment.apiUrl;

constructor(private http: HttpClient) { }

getPlayer(id): Observable<Player> {
  return this.http.get<Player>(this.baseUrl + 'players/' + id);
}

getPlayers(): Observable<Player[]> {
  return this.http.get<Player[]>(this.baseUrl + 'players');
}

updatePlayer(id: number, player: Player) {
  return this.http.put(this.baseUrl + 'players/' + id, player);
}

}
