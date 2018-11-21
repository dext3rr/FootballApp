import { Component, OnInit } from '@angular/core';
import { Match } from '../_models/Match';
import { MatchService } from '../_services/match.service';
import { AlertifyService } from '../_services/alertify.service';
import { TableService } from '../_services/table.service';
import { ActivatedRoute } from '@angular/router';
import { load } from '@angular/core/src/render3/instructions';

@Component({
  selector: 'app-matches',
  templateUrl: './matches.component.html',
  styleUrls: ['./matches.component.css']
})
export class MatchesComponent implements OnInit {
  match: Match;
  matchId: number;
  formActive: boolean;
  model: any = {};

  constructor(private matchService: MatchService, private tableService: TableService,
     private alertify: AlertifyService, private route: ActivatedRoute) { }

  ngOnInit() {
    this.loadMatch();
  }

  toggleForm() {
    this.formActive = !this.formActive;
  }

  loadMatch() {
    this.matchId = this.route.snapshot.params['id'];
    this.matchService.getMatch(+this.matchId).subscribe((match: Match) => {
      this.match = match;
    }, error => {
      this.alertify.error(error);
    });
  }
}
