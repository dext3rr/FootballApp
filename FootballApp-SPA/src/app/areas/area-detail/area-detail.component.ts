import { Component, OnInit} from '@angular/core';
import { Area } from 'src/app/_models/area';
import { AreaService } from 'src/app/_services/area.service';
import { AlertifyService } from 'src/app/_services/alertify.service';
import { ActivatedRoute, Router } from '@angular/router';


@Component({
  selector: 'app-area-detail',
  templateUrl: './area-detail.component.html',
  styleUrls: ['./area-detail.component.css']
})
export class AreaDetailComponent implements OnInit {
  area: Area;
  areaId: number;


  constructor(private areaService: AreaService, private alertify: AlertifyService,
    private router: Router, private route: ActivatedRoute) { }

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
