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
  area: Area;
  areaId: number;

  constructor(private leagueService: LeagueService, private areaService: AreaService, private alertify: AlertifyService,
    private router: Router, private route: ActivatedRoute) { }

  ngOnInit() {
    this.loadLeagues();
    this.loadArea();
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
}
