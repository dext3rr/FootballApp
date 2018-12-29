import { Component, OnInit } from '@angular/core';
import { Team } from 'src/app/_models/team';
import { TeamService } from 'src/app/_services/team.service';
import { AlertifyService } from 'src/app/_services/alertify.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Player } from 'src/app/_models/Player';
import { AuthService } from 'src/app/_services/auth.service';

@Component({
  selector: 'app-team-detail',
  templateUrl: './team-detail.component.html',
  styleUrls: ['./team-detail.component.css']
})
export class TeamDetailComponent implements OnInit {
  team: Team;
  teamId: number;
  players: Player[];

  constructor(private authService: AuthService, private teamService: TeamService, private alertify: AlertifyService,
    private router: Router, private route: ActivatedRoute) { }

  ngOnInit() {
    this.loadTeam();
    this.loadPlayers();
  }

  loadTeam() {
    this.teamId = this.route.snapshot.params['id'];
    this.teamService.getTeam(+this.teamId).subscribe((team: Team) => {
      this.team = team;
    }, error => {
      this.alertify.error(error);
    });
  }

  loadPlayers() {
    this.teamService.getPlayers(this.teamId).subscribe((players: Player[]) => {
      this.players = players;
    }, error => {
      this.alertify.error(error);
    });
  }

  likeTeam(teamId: number) {
    this.teamService.likeTeam(this.authService.decodedToken.nameid, teamId).subscribe(data => {
      this.alertify.success('Dodano drużynę do ulubionych.');
    }, error => {
      this.alertify.error(error);
    });
  }

  deleteTeam() {
    this.alertify.confirm('Czy na pewno chcesz usunąć drużynę?', () => {
      this.teamService.deleteTeam(this.team.id).subscribe(() => {
        this.alertify.success('Drużyna została usunięta.');
        this.router.navigate(['/teams']);
      }, error => {
        this.alertify.error('Nie udało się usunąć drużyny.');
      });
    });
  }
}
