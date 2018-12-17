import { Component, OnInit, Input } from '@angular/core';
import { FixtureService } from '../_services/fixture.service';
import { AlertifyService } from '../_services/alertify.service';
import { Fixture } from '../_models/Fixture';

@Component({
  selector: 'app-fixtures',
  templateUrl: './fixtures.component.html',
  styleUrls: ['./fixtures.component.css']
})
export class FixturesComponent implements OnInit {
  @Input() seasonId: number;
  fixtures: Fixture[];
  model: any = {};
  formActive: boolean;
  fixtureExist: boolean;

  constructor(private fixtureService: FixtureService, private alertify: AlertifyService) { }

  ngOnInit() {
    this.seasonId = 1;
    this.formActive = false;
    this.loadFixtures();
    console.log(this.fixtures);
    this.fixtureExist = false;
  }

  toggleForm() {
    this.formActive = !this.formActive;
  }

  loadFixtures() {
    this.fixtureService.getSeasonFixtures(this.seasonId).subscribe((fixtures: Fixture[]) => {
      this.fixtures = fixtures;
    }, error => {
      this.alertify.error(error);
    });
  }


  addFixture() {
    this.fixtures.forEach(fixture => {
      if (fixture.number === this.model.number) {
        this.fixtureExist = true;
        return;
      } else {
        this.fixtureExist = false;
      }
    });

    if (!this.fixtureExist) {
      this.model.seasonId = this.seasonId;
      this.fixtureService.addFixture(this.model).subscribe(() => {
        this.alertify.success('Pomyślnie dodano nową kolejkę.');
        this.loadFixtures();
      }, error => {
        this.alertify.error(error);
      });
      this.formActive = false;
    } else {
      this.alertify.error('Kolejka o tym numerze już istnieje');
    }
  }

  deleteFixture(id: number) {
    this.alertify.confirm('Czy na pewno chcesz usunąć kolejkę?', () => {
      this.fixtureService.deleteFixture(id).subscribe(() => {
        this.alertify.success('Kolejka została usunięta.');
        this.loadFixtures();
      }, error => {
        this.alertify.error('Nie udało się usunąć kolejki.');
      });
    });
  }
}
