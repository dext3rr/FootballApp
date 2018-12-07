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
import { Goal } from '../_models/Goal';
import { Card } from '../_models/Card';
import { CardService } from '../_services/card.service';

@Component({
  selector: 'app-matches',
  templateUrl: './matches.component.html',
  styleUrls: ['./matches.component.css']
})
export class MatchesComponent implements OnInit {
  match: Match;
  matchId: number;
  formActive: boolean;
  homeTeamId: number;
  awayTeamId: number;
  model: any = {};
  players: Player[];
  teamSelected: boolean;
  selectedTeamId: number;
  goals: Goal[];
  cards: Card[];
  homeGoals: Goal[] = new Array();
  awayGoals: Goal[] = new Array();
  matchEnded: boolean;

  constructor(private matchService: MatchService, private tableService: TableService, private teamService: TeamService,
    private goalService: GoalService, private cardService: CardService,
    private alertify: AlertifyService, private route: ActivatedRoute) { }

  ngOnInit() {
    this.loadMatch();
    this.loadMatchGoals();
    this.loadMatchCards();
  }

  toggleForm() {
    this.formActive = !this.formActive;
  }

  loadMatch() {
    this.matchId = this.route.snapshot.params['id'];
    this.matchService.getMatch(+this.matchId).subscribe((match: Match) => {
      this.match = match;
      this.homeTeamId = match.homeTeamId;
      this.awayTeamId = match.awayTeamId;
      this.matchEnded = match.hasEnded;
    }, error => {
      this.alertify.error(error);
    });
  }

  loadMatchGoals() {
    this.goalService.getMatchGoals(+this.matchId).subscribe((goals: Goal[]) => {
      this.goals = goals;
      this.setHomeAwayGoals(goals);
    }, error => {
      this.alertify.error(error);
    });
  }

  setHomeAwayGoals(goals) {
    goals.forEach(goal => {
      if (goal.teamId === this.homeTeamId) {
        this.homeGoals.push(goal);
      } else if (goal.teamId === this.awayTeamId) {
        this.awayGoals.push(goal);
      }
    });
  }

  loadMatchCards() {
    this.cardService.getMatchCards(+this.matchId).subscribe((cards: Card[]) => {
      this.cards = cards;
    }, error => {
      this.alertify.error(error);
    });
  }
}
