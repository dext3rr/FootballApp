import { Component, OnInit } from '@angular/core';
import { Area } from 'src/app/_models/area';
import { BsModalRef, BsModalService } from 'ngx-bootstrap';
import { AreaService } from 'src/app/_services/area.service';
import { AlertifyService } from 'src/app/_services/alertify.service';
import { AreaEditModalComponent } from '../area-edit-modal/area-edit-modal.component';
import { AreaAddModalComponent } from '../area-add-modal/area-add-modal.component';

@Component({
  selector: 'app-area-management',
  templateUrl: './area-management.component.html',
  styleUrls: ['./area-management.component.css']
})
export class AreaManagementComponent implements OnInit {
  area: Area;
  areas: Area[];
  model: any = {};
  bsModalRef: BsModalRef;

  constructor(private areaService: AreaService, private modalService: BsModalService,
    private alertify: AlertifyService) { }

  ngOnInit() {
    this.getAreas();
  }

  getAreas() {
    this.areaService.getAreas().subscribe((areas: Area[]) => {
      this.areas = areas;
    }, error => {
      this.alertify.error(error);
    });
  }

  addAreaModal() {
    this.bsModalRef = this.modalService.show(AreaAddModalComponent);
    this.bsModalRef.content.addNewArea.subscribe((value) => {
      this.model.name = value.name;
        this.areaService.addArea(this.model).subscribe(() => {
          this.alertify.success('Pomyślnie dodano okręg');
          this.getAreas();
        }, error => {
          this.alertify.error(error);
        });
    });
  }

  editAreaModal(area: Area) {
    this.getAreas();
    const initialState = {
      area,
    };
    this.bsModalRef = this.modalService.show(AreaEditModalComponent, { initialState });
    this.bsModalRef.content.updateSelectedArea.subscribe((value) => {
        this.areaService.editArea(area.id, area).subscribe(() => {
          this.alertify.success('Pomyślnie edytowano okręg');
          this.getAreas();
        }, error => {
          this.alertify.error(error);
        });
    });
  }

  deleteArea(id, areaName) {
    this.alertify.confirm('Czy na pewno chcesz usunąć okręg o nazwie \"' + areaName + '\" ?', () => {
      this.areaService.deleteArea(id).subscribe(() => {
        this.alertify.success('Okręg został usunięty.');
        this.getAreas();
      }, error => {
        this.alertify.error('Nie udało się usunąć okręgu.');
    });
  });
  }

}
