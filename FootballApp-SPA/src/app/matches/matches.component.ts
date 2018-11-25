import { Component, OnInit, ViewChild } from '@angular/core';
import { Match } from '../_models/Match';
import { MatchService } from '../_services/match.service';
import { AlertifyService } from '../_services/alertify.service';
import { TableService } from '../_services/table.service';
import { ActivatedRoute } from '@angular/router';
import { load } from '@angular/core/src/render3/instructions';
import { TeamService } from '../_services/team.service';
import { Player } from '../_models/Player';
import { GoalService } from '../_services/goal.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-matches',
  templateUrl: './matches.component.html',
  styleUrls: ['./matches.component.css']
})
export class MatchesComponent implements OnInit {
  @ViewChild('addGoalForm') addGoalForm: NgForm;
  match: Match;
  matchId: number;
  formActive: boolean;
  model: any = {};
  players: Player[];
  teamSelected: boolean;
  selectedTeamId: number;

  constructor(private matchService: MatchService, private tableService: TableService, private teamService: TeamService,
    private goalService: GoalService, private alertify: AlertifyService, private route: ActivatedRoute) { }

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

  loadTeamPlayers(id) {
    this.selectedTeamId = id;
    this.teamService.getPlayers(+id).subscribe((players: Player[]) => {
      this.players = players;
      this.teamSelected = true;
    }, error => {
      this.alertify.error(error);
    });
  }

  addGoal() {
    if (this.model.penalty && this.model.ownGoal) {
      this.alertify.warning('Bramka nie może być jednocześnie samobójcza i z rzutu karnego!');
    } else {
      this.model.matchId = this.matchId;
      this.model.teamId = this.selectedTeamId;
      this.goalService.addGoal(this.model).subscribe(() => {
        this.alertify.success('Dodano bramkę.');
      }, error => {
        this.alertify.error(error);
      });
    }
  }
}
