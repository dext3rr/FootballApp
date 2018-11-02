import { Component, OnInit } from '@angular/core';
import { Area } from 'src/app/_models/area';
import { AreaService } from 'src/app/_services/area.service';
import { AlertifyService } from 'src/app/_services/alertify.service';
import { ActivatedRoute } from '@angular/router';
import { League } from 'src/app/_models/league';
import { LeagueService } from 'src/app/_services/league.service';
import { LeaguesComponent } from 'src/app/leagues/leagues.component';

@Component({
  providers: [LeaguesComponent],
  selector: 'app-area-detail',
  templateUrl: './area-detail.component.html',
  styleUrls: ['./area-detail.component.css']
})
export class AreaDetailComponent implements OnInit {
  area: Area;
  leagues: League[];

  constructor(private areaService: AreaService, private leaguesComponent: LeaguesComponent,
    private leagueService: LeagueService, private alertify: AlertifyService,
    private route: ActivatedRoute) { }

  ngOnInit() {
    this.loadArea();
    this.leaguesComponent.loadLeagues();
    this.leagues = this.leaguesComponent.leagues;
    console.log(this.leaguesComponent.leagues);
  }

  loadArea() {
    this.areaService.getArea(+this.route.snapshot.params['id']).subscribe((area: Area) => {
      this.area = area;
    }, error => {
      this.alertify.error(error);
    });
  }
}
