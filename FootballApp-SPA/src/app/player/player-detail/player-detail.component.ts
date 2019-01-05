import { Component, OnInit } from '@angular/core';
import { AlertifyService } from 'src/app/_services/alertify.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Player } from '../../_models/Player';
import { PlayerService } from '../../_services/player.service';
import { Team } from '../../_models/team';
import { TeamService } from '../../_services/team.service';
import { AuthService } from 'src/app/_services/auth.service';

@Component({
  selector: 'app-player-detail',
  templateUrl: './player-detail.component.html',
  styleUrls: ['./player-detail.component.css']
})
export class PlayerDetailComponent implements OnInit {
  player: Player;
  team: Team;
  teamId: number;

  constructor(private authService: AuthService, private playerService: PlayerService,
    private teamService: TeamService, private alertify: AlertifyService,
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

  likePlayer(playerId: number) {
    this.playerService.likePlayer(this.authService.decodedToken.nameid, playerId).subscribe(data => {
      this.alertify.success('Dodano zawodnika do ulubionych.');
    }, error => {
      this.alertify.error(error);
    });
  }

  deletePlayer() {
    this.alertify.confirm('Czy na pewno chcesz usunąć zawodnika?', () => {
      this.playerService.deletePlayer(this.player.id).subscribe(() => {
        this.alertify.success('Zawodnik został usunięty.');
        this.router.navigate(['/players']);
      }, error => {
        this.alertify.error('Nie udało się usunąć zawodnika.');
      });
    });
  }
}

