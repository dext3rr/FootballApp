import { Component, OnInit, Input } from '@angular/core';
import { League } from '../_models/league';
import { LeagueService } from '../_services/league.service';
import { AlertifyService } from '../_services/alertify.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Area } from '../_models/area';
import { AreaService } from '../_services/area.service';

@Component({
  selector: 'app-leagues',
  templateUrl: './leagues.component.html',
  styleUrls: ['./leagues.component.css']
})
export class LeaguesComponent implements OnInit {

  leagues: League[];
  model: any = {};
  formActive: boolean;
  area: Area;
  areaId: number;

  constructor(private leagueService: LeagueService, private areaService: AreaService, private alertify: AlertifyService,
    private router: Router, private route: ActivatedRoute) { }

  ngOnInit() {
    this.loadLeagues();
    this.loadArea();
    this.formActive = false;
  }

  loadLeagues() {
    this.areaId = this.route.snapshot.params['id'];
    this.leagueService.getAreaLeagues(this.areaId).subscribe((leagues: League[]) => {
      this.leagues = leagues;
    }, error => {
      this.alertify.error(error);
    });
  }

  loadArea() {
    this.areaService.getArea(+this.areaId).subscribe((area: Area) => {
      this.area = area;
    }, error => {
      this.alertify.error(error);
    });
  }

  toggleForm() {
    this.formActive = !this.formActive;
  }

  addLeague() {
    if (this.model.name) {
      this.model.areaId = this.areaId;
      this.leagueService.addLeague(this.model).subscribe(() => {
        this.alertify.success('Pomyślnie dodano nową ligę.');
        this.loadLeagues();
      }, error => {
        this.alertify.error(error);
      });
    }
  }

  deleteArea() {
    this.alertify.confirm('Czy na pewno chcesz usunąć okręg o nazwie \"' + this.area.name + '\" ?', () => {
      this.areaService.deleteArea(this.areaId).subscribe(() => {
        this.alertify.success('Okręg został usunięty.');
        this.router.navigate(['/areas']);
      }, error => {
        this.alertify.error('Nie udało się usunąć okręgu.');
    });
  });
  }
}
