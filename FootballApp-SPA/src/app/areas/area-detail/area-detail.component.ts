import { Component, OnInit} from '@angular/core';
import { Area } from 'src/app/_models/area';
import { AreaService } from 'src/app/_services/area.service';
import { AlertifyService } from 'src/app/_services/alertify.service';
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-area-detail',
  templateUrl: './area-detail.component.html',
  styleUrls: ['./area-detail.component.css']
})
export class AreaDetailComponent implements OnInit {
  area: Area;
  areaId: number;


  constructor(private areaService: AreaService, private alertify: AlertifyService,
    private route: ActivatedRoute) { }

  ngOnInit() {
    this.loadArea();
  }

  loadArea() {
    this.areaId = this.route.snapshot.params['id'];
    this.areaService.getArea(+this.areaId).subscribe((area: Area) => {
      this.area = area;
    }, error => {
      this.alertify.error(error);
    });
  }



}
