import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient} from '@angular/common/http';
import { Observable } from 'rxjs';
import { Player } from '../_models/Player';
import { Position } from '../_models/Position';

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

getPositions(): Observable<Position[]> {
  return this.http.get<Position[]>(this.baseUrl + 'players/positions');
}

addPlayer(model: any) {
  return this.http.post<Player>(this.baseUrl + 'players/addPlayer', model);
}

deletePlayer(id: number) {
  return this.http.delete<Player>(this.baseUrl + 'players/' + id + '/deletePlayer');
}

updatePlayer(id: number, player: Player) {
  return this.http.put(this.baseUrl + 'players/' + id, player);
}

}
