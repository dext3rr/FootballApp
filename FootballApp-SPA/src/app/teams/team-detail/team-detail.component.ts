import { Component, OnInit } from '@angular/core';
import { Team } from 'src/app/_models/team';
import { TeamService } from 'src/app/_services/team.service';
import { AlertifyService } from 'src/app/_services/alertify.service';
import { ActivatedRoute } from '@angular/router';
import { Player } from 'src/app/_models/Player';

@Component({
  selector: 'app-team-detail',
  templateUrl: './team-detail.component.html',
  styleUrls: ['./team-detail.component.css']
})
export class TeamDetailComponent implements OnInit {
  team: Team;
  teamId: number;
  players: Player[];

  constructor(private teamService: TeamService, private alertify: AlertifyService,
    private route: ActivatedRoute) { }

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
}
