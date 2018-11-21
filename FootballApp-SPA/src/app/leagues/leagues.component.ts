import { Component, OnInit, Input } from '@angular/core';
import { League } from '../_models/league';
import { LeagueService } from '../_services/league.service';
import { AlertifyService } from '../_services/alertify.service';
import { Router } from '@angular/router';
import { Area } from '../_models/area';
import { AreaService } from '../_services/area.service';

@Component({
  selector: 'app-leagues',
  templateUrl: './leagues.component.html',
  styleUrls: ['./leagues.component.css']
})
export class LeaguesComponent implements OnInit {

  @Input() areaId: number;
  leagues: League[];
  model: any = {};
  formActive: boolean;
  areas: Area[];

  constructor(private leagueService: LeagueService, private areaService: AreaService, private alertify: AlertifyService,
    private router: Router) { }

  ngOnInit() {
    this.loadLeagues();
    this.loadAreas();
    this.formActive = false;
  }

  loadLeagues() {
    if (this.areaId != null) {
    this.leagueService.getAreaLeagues(this.areaId).subscribe((leagues: League[]) => {
      this.leagues = leagues;
    }, error => {
      this.alertify.error(error);
    });
  } else {
    this.leagueService.getLeagues().subscribe((leagues: League[]) => {
      this.leagues = leagues;
    }, error => {
      this.alertify.error(error);
    });
  }
  }

  loadAreas() {
    this.areaService.getAreas().subscribe((areas: Area[]) => {
      this.areas = areas;
    }, error => {
      this.alertify.error(error);
    });
  }

  toggleForm() {
    this.formActive = !this.formActive;
  }

  addLeague() {
    if (this.model.name) {
      this.leagueService.addLeague(this.model).subscribe(() => {
        this.alertify.success('Pomyślnie dodano nową ligę.');
        this.router.navigate(['/leagues']);
      }, error => {
        this.alertify.error(error);
      });
    }
  }
}
