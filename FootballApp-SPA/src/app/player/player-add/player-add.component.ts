import { Component, OnInit, ViewChild, HostListener } from '@angular/core';
import { PlayerService } from 'src/app/_services/player.service';
import { AlertifyService } from 'src/app/_services/alertify.service';
import { Router } from '@angular/router';
import { BsDatepickerConfig } from 'ngx-bootstrap';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Team } from 'src/app/_models/team';
import { Position } from 'src/app/_models/Position';
import { TeamService } from 'src/app/_services/team.service';

@Component({
  selector: 'app-player-add',
  templateUrl: './player-add.component.html',
  styleUrls: ['./player-add.component.css']
})

export class PlayerAddComponent implements OnInit {
  teams: Team[];
  positions: Position[];
  model: any = {};
  bsConfig: Partial<BsDatepickerConfig>;
  @ViewChild('newPlayerForm') newPlayerForm: FormGroup;
  @HostListener('window:beforeunload', ['$event'])
  unloadNotification($event: any) {
    if (this.newPlayerForm.dirty) {
      $event.returnValue = true;
    }
  }

  constructor(private playerService: PlayerService, private teamService: TeamService,
    private formBuilder: FormBuilder, private alertify: AlertifyService,
    private router: Router) { }

  ngOnInit() {
    this.createNewPlayerForm();
    this.bsConfig = {
      containerClass: 'theme-red'
    },
    this.getTeams();
    this.getPositions();
  }

  createNewPlayerForm() {
    this.newPlayerForm = this.formBuilder.group({
      name: ['', Validators.required],
      surname: ['', Validators.required],
      country: ['', Validators.required],
      dateOfBirth: ['', Validators.required],
      teamId: ['', Validators.required],
      positionId: ['', Validators.required],
    });
  }

  getTeams() {
    this.teamService.getTeams().subscribe((teams: Team[]) => {
      this.teams = teams;
    }, error => {
      this.alertify.error(error);
    });
  }

  getPositions() {
    this.playerService.getPositions().subscribe((positions: Position[]) => {
      this.positions = positions;
    }, error => {
      this.alertify.error(error);
    });
  }

  addPlayer() {
    if (this.newPlayerForm.valid) {
      this.model = Object.assign({}, this.newPlayerForm.value);
      this.playerService.addPlayer(this.model).subscribe(() => {
        this.alertify.success('Pomyślnie dodano nowego zawodnika.');
        this.router.navigate(['/players']);
      }, error => {
        this.alertify.error(error);
      });
    }
  }
}
