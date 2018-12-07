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
  formActive: boolean;

  constructor(private areaService: AreaService, private alertify: AlertifyService,
    private router: Router) { }

  ngOnInit() {
    this.loadAreas();
    this.formActive = false;
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

  addArea() {
    if (this.model.name) {
      this.areaService.addArea(this.model).subscribe(() => {
        this.alertify.success('Pomyślnie dodano nowy okręg.');
        this.loadAreas();
      }, error => {
        this.alertify.error(error);
      });
    }
  }

  // addArea() {
  //   this.areaService.addArea(this.area).subscribe(() => {
  //     this.alertify.success('Pomyślnie dodano nowy okręg.');
  //   }, error => {
  //     this.alertify.error(error);
  //   });
  // }
}
