import { Component, OnInit} from '@angular/core';
import { AlertifyService } from 'src/app/_services/alertify.service';
import { Player } from '../_models/Player';
import { PlayerService } from '../_services/player.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-player',
  templateUrl: './player.component.html',
  styleUrls: ['./player.component.css']
})
export class PlayerComponent implements OnInit {
  players: Player[];

  constructor(private playerService: PlayerService, private alertify: AlertifyService,
   private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.data.subscribe(data => {
      this.players = data['players'];
    });
  }
}
