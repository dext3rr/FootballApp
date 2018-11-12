import { Component, OnInit} from '@angular/core';
import { AlertifyService } from 'src/app/_services/alertify.service';
import { ActivatedRoute } from '@angular/router';
import { Player } from '../_models/Player';
import { PlayerService } from '../_services/player.service';
import { Team } from '../_models/team';
import { TeamService } from '../_services/team.service';

@Component({
  selector: 'app-player',
  templateUrl: './player.component.html',
  styleUrls: ['./player.component.css']
})
export class PlayerComponent implements OnInit {
  player: Player;
  playerId: number;
  team: Team;
  teamId: number;

  constructor(private playerService: PlayerService, private teamService: TeamService, private alertify: AlertifyService,
    private route: ActivatedRoute) { }

  ngOnInit() {
    this.loadPlayer();
  }

  loadPlayer() {
    this.playerId = this.route.snapshot.params['id'];
    this.playerService.getPlayer(+this.playerId).subscribe((player: Player) => {
      this.player = player;
      this.loadTeam();
    }, error => {
      this.alertify.error(error);
    });
  }

  loadTeam() {
    this.teamId = this.player.teamId;
    this.teamService.getTeam(+this.teamId).subscribe((team: Team) => {
      this.team = team;
    }, error => {
      this.alertify.error(error);
    });
  }
}
