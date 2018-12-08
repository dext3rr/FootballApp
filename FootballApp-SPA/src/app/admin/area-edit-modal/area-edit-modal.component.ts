import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Area } from 'src/app/_models/area';
import { BsModalRef } from 'ngx-bootstrap';

@Component({
  selector: 'app-area-edit-modal',
  templateUrl: './area-edit-modal.component.html',
  styleUrls: ['./area-edit-modal.component.css']
})
export class AreaEditModalComponent implements OnInit {
  @Output() updateSelectedArea = new EventEmitter();
  area: Area;

  constructor(public bsModalRef: BsModalRef) { }

  ngOnInit() {
  }

  updateArea() {
    this.updateSelectedArea.emit(this.area);
    this.bsModalRef.hide();
   }
}
