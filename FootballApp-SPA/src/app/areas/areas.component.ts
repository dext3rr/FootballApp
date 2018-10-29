import { Component, OnInit } from '@angular/core';
import { Area } from '../_models/area';
import { AlertifyService } from '../_services/alertify.service';
import { AreaService } from '../_services/area.service';

@Component({
  selector: 'app-areas',
  templateUrl: './areas.component.html',
  styleUrls: ['./areas.component.css']
})
export class AreasComponent implements OnInit {
  areas: Area[];

  constructor(private areaService: AreaService, private alertify: AlertifyService) { }

  ngOnInit() {
    this.loadAreas();
  }

  loadAreas() {
    this.areaService.getAreas().subscribe((areas: Area[]) => {
      this.areas = areas;
    }, error => {
      this.alertify.error(error);
    });
  }
}
