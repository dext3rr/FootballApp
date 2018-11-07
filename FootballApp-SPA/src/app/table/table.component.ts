import { Component, OnInit, Input } from '@angular/core';
import { AlertifyService } from '../_services/alertify.service';
import { Team } from '../_models/team';
import { TableService } from '../_services/table.service';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent implements OnInit {

  @Input() leagueId: number;

  constructor(private tableService: TableService, private alertify: AlertifyService) { }
  teams: Team[];

  ngOnInit() {
    this.loadLeagueTeams();
  }

  loadLeagueTeams() {
    this.tableService.getLeagueTeams(this.leagueId).subscribe((teams: Team[]) => {
      this.teams = teams;
    }, error => {
      this.alertify.error(error);
    });
  }

}
