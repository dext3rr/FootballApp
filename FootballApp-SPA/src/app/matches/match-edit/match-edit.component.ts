import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Match } from 'src/app/_models/Match';
import { Player } from 'src/app/_models/Player';
import { MatchService } from 'src/app/_services/match.service';
import { TableService } from 'src/app/_services/table.service';
import { TeamService } from 'src/app/_services/team.service';
import { GoalService } from 'src/app/_services/goal.service';
import { AlertifyService } from 'src/app/_services/alertify.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Goal } from 'src/app/_models/Goal';
import { CardService } from 'src/app/_services/card.service';
import { Card } from 'src/app/_models/Card';
import { SeasonTeam } from 'src/app/_models/SeasonTeam';

@Component({
  selector: 'app-match-edit',
  templateUrl: './match-edit.component.html',
  styleUrls: ['./match-edit.component.css']
})
export class MatchEditComponent implements OnInit {
  @ViewChild('addGoalForm') addGoalForm: NgForm;
  match: Match;
  matchId: number;
  teamId: number;
  homeTeamId: number;
  awayTeamId: number;
  goalFormActive: boolean;
  cardFormActive: boolean;
  model: any = {};
  players: Player[];
  teamSelected: boolean;
  selectedTeamId: number;
  goals: Goal[];
  cards: Card[];
  homeSeasonTeamId: number;
  homeSeasonTeam: SeasonTeam;
  awaySeasonTeamId: number;
  awaySeasonTeam: SeasonTeam;
  seasonId: number;
  matchUpdated: boolean;
  matchEnded: boolean;

  constructor(private matchService: MatchService, private tableService: TableService, private teamService: TeamService,
    private goalService: GoalService, private cardService: CardService,
    private alertify: AlertifyService, private router: Router, private route: ActivatedRoute) { }

  ngOnInit() {
    this.loadMatch();
    this.loadMatchGoals();
    this.loadMatchCards();
    this.matchUpdated = false;
    this.matchEnded = false;
  }

  toggleGoalForm() {
    this.goalFormActive = !this.goalFormActive;
  }

  toggleCardForm() {
    this.cardFormActive = !this.cardFormActive;
  }

  loadMatch() {
    this.matchId = this.route.snapshot.params['id'];
    this.matchService.getMatch(+this.matchId).subscribe((match: Match) => {
      this.match = match;
      this.seasonId = match.fixture.seasonId;
      this.homeTeamId = match.homeTeamId;
      this.awayTeamId = match.awayTeamId;
    }, error => {
      this.alertify.error(error);
    });
  }

  updateMatch() {
    let homeGoals = 0;
    let awayGoals = 0;
    this.goals.forEach(goal => {
      if (goal.player.teamId === this.match.homeTeamId) {
        if (goal.ownGoal) {
          awayGoals++;
        } else {
          homeGoals++;
        }
      } else if (goal.player.teamId === this.match.awayTeamId) {
        if (goal.ownGoal) {
          homeGoals++;
        } else {
          awayGoals++;
        }
      }
    });
    this.match.homeGoals = homeGoals;
    this.match.awayGoals = awayGoals;
    this.match.hasEnded = true;
    this.matchService.updateMatch(+this.matchId, this.match).subscribe(next => {
      this.alertify.success('Zaktualizowano mecz.');
    }, error => {
      this.alertify.error(error);
    });

    // cards
    if (this.cards.length > 0) {
      let homeYellowCards = 0;
      let homeRedCards = 0;
      let awayYellowCards = 0;
      let awayRedCards = 0;

      this.cards.forEach(card => {
        if (card.player.teamId === this.match.homeTeamId) {
          if (card.isYellow) {
            homeYellowCards++;
          } else {
            homeRedCards++;
          }
        } else if (card.player.teamId === this.match.awayTeamId) {
          if (card.isYellow) {
            awayYellowCards++;
          } else {
            awayRedCards++;
          }
        }
      });

      this.tableService.getSeasonTeam(+this.seasonId, this.homeTeamId).subscribe((homeSeasonTeam: SeasonTeam) => {
        this.homeSeasonTeamId = homeSeasonTeam.id;
        this.homeSeasonTeam = homeSeasonTeam;
        this.homeSeasonTeam.matches++;
        if (this.match.homeGoals > this.match.awayGoals) {
          this.homeSeasonTeam.wins++;
          this.homeSeasonTeam.points += 3;
        } else if (this.match.homeGoals === this.match.awayGoals) {
          this.homeSeasonTeam.draws++;
          this.homeSeasonTeam.points++;
        } else {
          this.homeSeasonTeam.losses++;
        }
        this.homeSeasonTeam.goalsScored += this.match.homeGoals;
        this.homeSeasonTeam.goalsConceded += this.match.awayGoals;
        this.homeSeasonTeam.yellowCards += homeYellowCards;
        this.homeSeasonTeam.redCards += homeRedCards;
      }, error => {
        this.alertify.error(error);
      });

      this.tableService.getSeasonTeam(+this.seasonId, this.awayTeamId).subscribe((awaySeasonTeam: SeasonTeam) => {
        this.awaySeasonTeamId = awaySeasonTeam.id;
        this.awaySeasonTeam = awaySeasonTeam;
        this.awaySeasonTeam.matches++;
        if (this.match.homeGoals > this.match.awayGoals) {
          this.awaySeasonTeam.losses++;
        } else if (this.match.homeGoals === this.match.awayGoals) {
          this.awaySeasonTeam.draws++;
          this.awaySeasonTeam.points++;
        } else {
          this.awaySeasonTeam.wins++;
          this.awaySeasonTeam.points += 3;
        }
        this.awaySeasonTeam.goalsScored += this.match.awayGoals;
        this.awaySeasonTeam.goalsConceded += this.match.homeGoals;
        this.awaySeasonTeam.yellowCards += awayYellowCards;
        this.awaySeasonTeam.redCards += awayRedCards;

        this.matchUpdated = true;
      }, error => {
        this.alertify.error(error);
      });
    }
  }

  updateTeamsToTable() {
    this.alertify.confirm('Czy na pewno chcesz zatwierdzić mecz? Ponowna edycja nie będzie już możliwa.', () => {

    this.tableService.updateSeasonTeam(+this.homeSeasonTeamId, this.homeSeasonTeam).subscribe(next => {
      this.alertify.success('Zaktualizowano tabelę dla drużyny gospodarzy.');
    }, error => {
      this.alertify.error(error);
    });

    this.tableService.updateSeasonTeam(+this.awaySeasonTeamId, this.awaySeasonTeam).subscribe(next => {
      this.alertify.success('Zaktualizowano tabelę dla drużyny gości.');
    }, error => {
      this.alertify.error(error);
    });

    this.match.hasEnded = true;
    this.matchService.updateMatch(+this.matchId, this.match).subscribe(next => {
      this.alertify.success('Mecz został zatwierdzony.');
    }, error => {
      this.alertify.error(error);
    });
    this.router.navigate(['/matches/' + this.matchId]);
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
