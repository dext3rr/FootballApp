import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { League } from 'src/app/_models/league';
import { BsModalRef } from 'ngx-bootstrap';

@Component({
  selector: 'app-season-add-modal',
  templateUrl: './season-add-modal.component.html',
  styleUrls: ['./season-add-modal.component.css']
})
export class SeasonAddModalComponent implements OnInit {
  @Output() addNewSeason = new EventEmitter();
  leagues: League[];
  model: any = {};

  constructor(public bsModalRef: BsModalRef) { }

  ngOnInit() {
  }

  addSeason() {
    this.addNewSeason.emit(this.model);
    this.bsModalRef.hide();
   }
}

