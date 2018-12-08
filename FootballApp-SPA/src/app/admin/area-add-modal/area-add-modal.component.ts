import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap';

@Component({
  selector: 'app-area-add-modal',
  templateUrl: './area-add-modal.component.html',
  styleUrls: ['./area-add-modal.component.css']
})
export class AreaAddModalComponent implements OnInit {
  @Output() addNewArea = new EventEmitter();
  model: any = {};

  constructor(public bsModalRef: BsModalRef) { }

  ngOnInit() {
  }

  addArea() {
    this.addNewArea.emit(this.model);
    this.bsModalRef.hide();
   }
}
