import { Component, OnInit } from '@angular/core';
import { Team } from '../_models/team';
import { TeamService } from '../_services/team.service';
import { AlertifyService } from '../_services/alertify.service';

@Component({
  selector: 'app-teams',
  templateUrl: './teams.component.html',
  styleUrls: ['./teams.component.css']
})
export class TeamsComponent implements OnInit {
  teams: Team[];

  constructor(private teamService: TeamService, private alertify: AlertifyService) { }

  ngOnInit() {
    this.loadTeams();
  }

  loadTeams() {
    this.teamService.getTeams().subscribe((teams: Team[]) => {
      this.teams = teams;
    }, error => {
      this.alertify.error(error);
    });
  }
}
