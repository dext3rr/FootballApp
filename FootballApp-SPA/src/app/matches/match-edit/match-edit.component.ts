import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Match } from 'src/app/_models/Match';
import { Player } from 'src/app/_models/Player';
import { MatchService } from 'src/app/_services/match.service';
import { TableService } from 'src/app/_services/table.service';
import { TeamService } from 'src/app/_services/team.service';
import { GoalService } from 'src/app/_services/goal.service';
import { AlertifyService } from 'src/app/_services/alertify.service';
import { ActivatedRoute } from '@angular/router';
import { Goal } from 'src/app/_models/Goal';
import { CardService } from 'src/app/_services/card.service';
import { Card } from 'src/app/_models/Card';

@Component({
  selector: 'app-match-edit',
  templateUrl: './match-edit.component.html',
  styleUrls: ['./match-edit.component.css']
})
export class MatchEditComponent implements OnInit {
  @ViewChild('addGoalForm') addGoalForm: NgForm;
  match: Match;
  matchId: number;
  formActive: boolean;
  model: any = {};
  players: Player[];
  teamSelected: boolean;
  selectedTeamId: number;
  goals: Goal[];
  cards: Card[];

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

  loadMatchGoals() {
    this.goalService.getMatchGoals(+this.matchId).subscribe((goals: Goal[]) => {
      this.goals = goals;
    }, error => {
      this.alertify.error(error);
    });
  }

  loadMatchCards() {
    this.cardService.getMatchCards(+this.matchId).subscribe((cards: Card[]) => {
      this.cards = cards;
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
        this.loadMatchGoals();
      }, error => {
        this.alertify.error(error);
      });
    }
  }

  deleteGoal(id) {
    this.alertify.confirm('Czy na pewno chcesz usunąć bramkę?', () => {
      this.goalService.deleteGoal(id).subscribe(() => {
        this.alertify.success('Bramka została usuniętą.');
        this.loadMatchGoals();
      }, error => {
        this.alertify.error('Nie udało się usunąć bramki');
      });
    });
  }

  addCard() {
    if (this.model.isYellow && this.model.isRed) {
      this.alertify.warning('Kartka nie może być jednocześnie żółta i czerwona.');
    } else {
      this.model.matchId = this.matchId;
      this.cardService.addCard(this.model).subscribe(() => {
        this.alertify.success('Dodano kartkę.');
        this.loadMatchCards();
      }, error => {
        this.alertify.error(error);
      });
    }
  }

  deleteCard(id) {
    this.alertify.confirm('Czy na pewno chcesz usunąć kartkę?', () => {
      this.cardService.deleteCard(id).subscribe(() => {
        this.alertify.success('Kartka została usuniętą.');
        this.loadMatchCards();
      }, error => {
        this.alertify.error('Nie udało się usunąć kartki.');
      });
    });
  }
}
