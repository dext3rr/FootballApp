import { Component, OnInit, ViewChild, HostListener } from '@angular/core';
import { Fixture } from 'src/app/_models/Fixture';
import { FixtureService } from 'src/app/_services/fixture.service';
import { AlertifyService } from 'src/app/_services/alertify.service';
import { ActivatedRoute } from '@angular/router';
import { Team } from 'src/app/_models/team';
import { TableService } from 'src/app/_services/table.service';
import { SeasonTeam } from 'src/app/_models/SeasonTeam';
import { NgForm } from '@angular/forms';
import { BsDatepickerConfig } from 'ngx-bootstrap';
import { MatchService } from 'src/app/_services/match.service';
import { Match } from 'src/app/_models/Match';

@Component({
  selector: 'app-fixture-detail',
  templateUrl: './fixture-detail.component.html',
  styleUrls: ['./fixture-detail.component.css']
})
export class FixtureDetailComponent implements OnInit {
  fixture: Fixture;
  model: any = {};
  fixtureId: number;
  matches: Match[];
  formActive: boolean;
  seasonTeams: SeasonTeam[];
  bsConfig: Partial<BsDatepickerConfig>;
  @ViewChild('addMatchrForm') newPlayerForm: NgForm;
  @HostListener('window:beforeunload', ['$event'])
  unloadNotification($event: any) {
    if (this.newPlayerForm.dirty) {
      $event.returnValue = true;
    }
  }
  constructor(private fixtureService: FixtureService, private tableService: TableService,
    private matchService: MatchService, private alertify: AlertifyService, private route: ActivatedRoute) { }

  ngOnInit() {
    this.bsConfig = {
      containerClass: 'theme-red'
    },
    this.loadFixture();
    this.loadFixureMatches();
  }

  toggleForm() {
    this.formActive = !this.formActive;
  }

  loadFixture() {
    this.fixtureId = this.route.snapshot.params['id'];
    this.fixtureService.getFixture(+this.fixtureId).subscribe((fixture: Fixture) => {
      this.fixture = fixture;
      this.loadSeasonTeams();
    }, error => {
      this.alertify.error(error);
    });
  }

  loadSeasonTeams() {
    this.tableService.getSeasonTeams(this.fixture.seasonId).subscribe((seasonTeams: SeasonTeam[]) => {
      this.seasonTeams = seasonTeams;
    }, error => {
      this.alertify.error(error);
    });
  }

  loadFixureMatches() {
    this.matchService.getFixtureMatches(+this.fixtureId).subscribe((matches: Match[]) => {
      this.matches = matches;
    }, error => {
      this.alertify.error(error);
    });
  }

  addMatch() {
    if (this.model.homeTeamId !== this.model.awayTeamId) {
      this.model.fixtureId = this.fixtureId;
      this.matchService.addMatch(this.model).subscribe(() => {
        this.alertify.success('Pomyślnie dodano nowy mecz.');
        this.loadFixureMatches();
      }, error => {
        this.alertify.error(error);
      });
    } else {
      this.alertify.error('Drużyna nie może grać sama ze sobą!');
    }
  }
}
