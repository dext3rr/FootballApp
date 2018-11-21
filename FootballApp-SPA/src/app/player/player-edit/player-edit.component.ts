import { Component, OnInit, ViewChild, HostListener } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Player } from 'src/app/_models/Player';
import { AlertifyService } from 'src/app/_services/alertify.service';
import { NgForm } from '@angular/forms';
import { PlayerService } from 'src/app/_services/player.service';
import { Team } from 'src/app/_models/team';
import { TeamService } from 'src/app/_services/team.service';
import { BsDatepickerConfig } from 'ngx-bootstrap';

@Component({
  selector: 'app-player-edit',
  templateUrl: './player-edit.component.html',
  styleUrls: ['./player-edit.component.css']
})
export class PlayerEditComponent implements OnInit {
  player: Player;
  teams: Team[];
  bsConfig: Partial<BsDatepickerConfig>;
  @ViewChild('editForm') editForm: NgForm;
  @HostListener('window:beforeunload', ['$event'])
  unloadNotification($event: any) {
    if (this.editForm.dirty) {
      $event.returnValue = true;
    }
  }

  constructor(private route: ActivatedRoute, private alertify: AlertifyService,
    private playerService: PlayerService, private teamService: TeamService) { }

  ngOnInit() {
    this.bsConfig = {
      containerClass: 'theme-red'
    },
    this.route.data.subscribe(data => {
      this.player = data['player'];
    });
    this.getTeams();
  }

  updatePlayer() {
    this.playerService.updatePlayer(this.player.id, this.player).subscribe(next => {
      this.alertify.success('Zaktualizowano zawodnika');
      this.editForm.reset(this.player);
    }, error => {
      this.alertify.error(error);
    });
  }

  getTeams() {
    this.teamService.getTeams().subscribe((teams: Team[]) => {
      this.teams = teams;
    }, error => {
      this.alertify.error(error);
    });
  }
}
