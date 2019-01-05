import { Component, OnInit, Input } from '@angular/core';
import { Manager } from 'src/app/_models/Manager';

@Component({
  selector: 'app-manager-card',
  templateUrl: './manager-card.component.html',
  styleUrls: ['./manager-card.component.css']
})
export class ManagerCardComponent implements OnInit {
  @Input() manager: Manager;

  constructor() { }

  ngOnInit() {
  }

}
