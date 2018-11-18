import { Component, OnInit} from '@angular/core';
import { AlertifyService } from 'src/app/_services/alertify.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Player } from '../../_models/Player';
import { PlayerService } from '../../_services/player.service';
import { Team } from '../../_models/team';
import { TeamService } from '../../_services/team.service';

@Component({
  selector: 'app-player-detail',
  templateUrl: './player-detail.component.html',
  styleUrls: ['./player-detail.component.css']
})
export class PlayerDetailComponent implements OnInit {

  player: Player;
  team: Team;
  teamId: number;

  constructor(private playerService: PlayerService, private teamService: TeamService, private alertify: AlertifyService,
    private router: Router, private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.data.subscribe(data => {
      this.player = data['player'];
      this.loadTeam();
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

