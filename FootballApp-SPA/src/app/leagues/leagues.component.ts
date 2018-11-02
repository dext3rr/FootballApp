import { Component, OnInit } from '@angular/core';
import { League } from '../_models/league';
import { LeagueService } from '../_services/league.service';
import { AlertifyService } from '../_services/alertify.service';

@Component({
  selector: 'app-leagues',
  templateUrl: './leagues.component.html',
  styleUrls: ['./leagues.component.css']
})
export class LeaguesComponent implements OnInit {

  constructor(private leagueService: LeagueService, private alertify: AlertifyService) { }
  leagues: League[];

  ngOnInit() {
    this.loadLeagues();
  }

  public loadLeagues() {
    this.leagueService.getLeagues().subscribe((leagues: League[]) => {
      this.leagues = leagues;
    }, error => {
      this.alertify.error(error);
    });
  }
}
