import { Component, OnInit } from '@angular/core';
import { Area } from '../_models/area';
import { AlertifyService } from '../_services/alertify.service';
import { AreaService } from '../_services/area.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-areas',
  templateUrl: './areas.component.html',
  styleUrls: ['./areas.component.css']
})
export class AreasComponent implements OnInit {
  areas: Area[];
  model: any = {};

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
