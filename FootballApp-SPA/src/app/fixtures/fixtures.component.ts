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

  constructor(private fixtureService: FixtureService, private alertify: AlertifyService) { }

  ngOnInit() {
    this.seasonId = 1;
    this.formActive = false;
    this.loadFixtures();
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
    if (this.model.number) {
      this.fixtureService.addFixture(this.model).subscribe(() => {
        this.alertify.success('Pomyślnie dodano nową kolejkę.');
      }, error => {
        this.alertify.error(error);
      });
    }
  }
}

