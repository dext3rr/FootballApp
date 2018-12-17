import { Component, OnInit, Input } from '@angular/core';
import { AlertifyService } from '../_services/alertify.service';
import { Team } from '../_models/team';
import { TableService } from '../_services/table.service';
import { LeagueService } from '../_services/league.service';
import { ActivatedRoute } from '@angular/router';
import { League } from '../_models/league';
import { Season } from '../_models/Season';
import { SeasonTeam } from '../_models/SeasonTeam';
import { MatTableDataSource } from '@angular/material/table';
import { TeamService } from '../_services/team.service';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent implements OnInit {
  league: League;
  leagueId: number;
  teams: Team[];
  team: Team;
  seasonId: number;
  seasons: Season[];
  seasonTeams: SeasonTeam[];
  seasonValue: string;
  season: Season;
  dataSource: any;
  seasonTeamId: number;
  seasonChosen: boolean;

  displayedColumns: string[] = ['position', 'teamId', 'matches', 'wins', 'draws', 'losses', 'goalsScored', 'goalsConceded', 'points'];

  constructor(private tableService: TableService, private teamService: TeamService, private leagueService: LeagueService,
    private alertify: AlertifyService, private route: ActivatedRoute) { }

  ngOnInit() {
    this.loadLeague();
    this.loadSeasons();
    this.loadSeasonTeams(1);
    this.seasonChosen = false;
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
    this.tableService.getSeasons(+this.leagueId).subscribe((seasons: Season[]) => {
      this.seasons = seasons;
    }, error => {
      this.alertify.error(error);
    });
  }

  loadSeason(id: number) {
    this.seasonChosen = true;
    this.loadSeasonTeams(id);
  }


  loadSeasonTeams(id: number) {
    this.tableService.getSeasonTeams(id).subscribe((seasonTeams: SeasonTeam[]) => {
      this.seasonTeams = seasonTeams;
      this.dataSource = new MatTableDataSource(seasonTeams);
    }, error => {
      this.alertify.error(error);
    });
  }

   loadSeasonTeam(seasonTeamId) {
    this.teamService.getTeam(+seasonTeamId).subscribe((team: Team) => {
      this.team = team;
      return this.team.name;
    }, error => {
      this.alertify.error(error);
    });
  }
}
