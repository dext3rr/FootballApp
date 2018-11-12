import { Component, OnInit, Input } from '@angular/core';
import { AlertifyService } from '../_services/alertify.service';
import { Team } from '../_models/team';
import { TableService } from '../_services/table.service';
import { LeagueService } from '../_services/league.service';
import { ActivatedRoute } from '@angular/router';
import { League } from '../_models/league';
import { Season } from '../_models/Season';
import {MatSelectModule} from '@angular/material/select';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent implements OnInit {

  league: League;
  leagueId: number;
  teams: Team[];
  seasonId: number;
  seasons: Season[];

  constructor(private tableService: TableService, private leagueService: LeagueService,
    private alertify: AlertifyService, private route: ActivatedRoute) { }

  ngOnInit() {
    this.loadLeague();
    this.loadSeasons();
  }


  loadLeague() {
    this.leagueId = this.route.snapshot.params['id'];
    this.leagueService.getLeague(+this.leagueId).subscribe((league: League) => {
      this.league = league;
    }, error => {
      this.alertify.error(error);
    });
  }

  loadSeasons() {
    this.leagueId = this.route.snapshot.params['id'];
    this.tableService.getSeasons(+this.leagueId).subscribe((seasons: Season[]) => {
      this.seasons = seasons;
    }, error => {
      this.alertify.error(error);
    });
  }


  loadSeasonTeams() {
    this.tableService.getSeasonTeams(1).subscribe((teams: Team[]) => {
      this.teams = teams;
    }, error => {
      this.alertify.error(error);
    });
  }


  // loadLeagueTeams() {
  //   this.tableService.getLeagueTeams(this.leagueId).subscribe((teams: Team[]) => {
  //     this.teams = teams;
  //   }, error => {
  //     this.alertify.error(error);
  //   });
  // }

}
