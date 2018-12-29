import { Component, OnInit } from '@angular/core';
import { AuthService } from '../_services/auth.service';
import { AlertifyService } from '../_services/alertify.service';
import { PlayerService } from '../_services/player.service';
import { PlayerLike } from '../_models/PlayerLike';

@Component({
  selector: 'app-favourite-players',
  templateUrl: './favourite-players.component.html',
  styleUrls: ['./favourite-players.component.css']
})
export class FavouritePlayersComponent implements OnInit {

  favouritePlayers: PlayerLike[];

  constructor(private authService: AuthService, private playerService: PlayerService, private alertify: AlertifyService) { }

  ngOnInit() {
    this.getFavouritePlayers();
  }

  getFavouritePlayers() {
    this.playerService.getLikedPlayers(this.authService.decodedToken.nameid).subscribe((favouritePlayers: PlayerLike[]) => {
      this.favouritePlayers = favouritePlayers;
    }, error => {
      this.alertify.error(error);
    });
  }
}
