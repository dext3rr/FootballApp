import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { League } from 'src/app/_models/league';
import { BsModalRef } from 'ngx-bootstrap';
import { Area } from 'src/app/_models/area';

@Component({
  selector: 'app-league-edit-modal',
  templateUrl: './league-edit-modal.component.html',
  styleUrls: ['./league-edit-modal.component.css']
})
export class LeagueEditModalComponent implements OnInit {
  @Output() updateSelectedLeague = new EventEmitter();
  league: League;
  areas: Area[];

  constructor(public bsModalRef: BsModalRef) { }

  ngOnInit() {
  }

  updateLeague() {
    console.log(this.areas);
    this.updateSelectedLeague.emit(this.league);
    this.bsModalRef.hide();
   }
}
