import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap';
import { Area } from 'src/app/_models/area';

@Component({
  selector: 'app-league-add-modal',
  templateUrl: './league-add-modal.component.html',
  styleUrls: ['./league-add-modal.component.css']
})
export class LeagueAddModalComponent implements OnInit {
  @Output() addNewLeague = new EventEmitter();
  areas: Area[];
  model: any = {};



  constructor(public bsModalRef: BsModalRef) { }

  ngOnInit() {
  }

  addLeague() {
    console.log(this.areas);
    this.addNewLeague.emit(this.model);
    this.bsModalRef.hide();
   }
}
