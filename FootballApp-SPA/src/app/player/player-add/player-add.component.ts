import { Component, OnInit, ViewChild, HostListener } from '@angular/core';
import { PlayerService } from 'src/app/_services/player.service';
import { AlertifyService } from 'src/app/_services/alertify.service';
import { Router } from '@angular/router';
import { BsDatepickerConfig } from 'ngx-bootstrap';
import { NgForm } from '@angular/forms';
import { Team } from 'src/app/_models/team';
import { TeamService } from 'src/app/_services/team.service';

@Component({
  selector: 'app-player-add',
  templateUrl: './player-add.component.html',
  styleUrls: ['./player-add.component.css']
})

export class PlayerAddComponent implements OnInit {
  teams: Team[];
  model: any = {};
  bsConfig: Partial<BsDatepickerConfig>;
  @ViewChild('newPlayerForm') newPlayerForm: NgForm;
  @HostListener('window:beforeunload', ['$event'])
  unloadNotification($event: any) {
    if (this.newPlayerForm.dirty) {
      $event.returnValue = true;
    }
  }

  constructor(private playerService: PlayerService, private teamService: TeamService,
     private alertify: AlertifyService, private router: Router) { }

  ngOnInit() {
    this.bsConfig = {
      containerClass: 'theme-red'
    },
    this.getTeams();
  }

  getTeams() {
    this.teamService.getTeams().subscribe((teams: Team[]) => {
      this.teams = teams;
    }, error => {
      this.alertify.error(error);
    });
  }

  getPositions() {
    
  }

  addPlayer() {
    if (this.model.name) {
      this.playerService.addPlayer(this.model).subscribe(() => {
        this.alertify.success('Pomyślnie dodano nowego zawodnika.');
        this.router.navigate(['/players']);
      }, error => {
        this.alertify.error(error);
      });
    }
  }
}
