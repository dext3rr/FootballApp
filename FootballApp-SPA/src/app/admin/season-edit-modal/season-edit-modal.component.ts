import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Season } from 'src/app/_models/Season';
import { League } from 'src/app/_models/league';
import { BsModalRef } from 'ngx-bootstrap';

@Component({
  selector: 'app-season-edit-modal',
  templateUrl: './season-edit-modal.component.html',
  styleUrls: ['./season-edit-modal.component.css']
})
export class SeasonEditModalComponent implements OnInit {
  @Output() updateSelectedSeason = new EventEmitter();
  season: Season;
  leagues: League[];

  constructor(public bsModalRef: BsModalRef) { }

  ngOnInit() {
  }

  updateSeason() {
    this.updateSelectedSeason.emit(this.season);
    this.bsModalRef.hide();
   }
}
