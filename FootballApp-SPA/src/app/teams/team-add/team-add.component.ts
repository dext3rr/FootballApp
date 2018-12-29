import { Component, OnInit, ViewChild, HostListener } from '@angular/core';
import { NgForm } from '@angular/forms';
import { League } from 'src/app/_models/league';
import { Manager } from 'src/app/_models/Manager';
import { TeamService } from 'src/app/_services/team.service';
import { LeagueService } from 'src/app/_services/league.service';
import { Router } from '@angular/router';
import { AlertifyService } from 'src/app/_services/alertify.service';

@Component({
  selector: 'app-team-add',
  templateUrl: './team-add.component.html',
  styleUrls: ['./team-add.component.css']
})
export class TeamAddComponent implements OnInit {
  model: any = {};
  leagues: League[];
  managers: Manager[];
  @ViewChild('newTeamForm') newTeamForm: NgForm;
  @HostListener('window:beforeunload', ['$event'])
  unloadNotification($event: any) {
    if (this.newTeamForm.dirty) {
      $event.returnValue = true;
    }
  }

  constructor(private teamService: TeamService, private leagueService: LeagueService,
    private alertify: AlertifyService, private router: Router) { }

  ngOnInit() {
   // this.getLeagues();
  }

  getLeagues() {
    this.leagueService.getLeagues().subscribe((leagues: League[]) => {
      this.leagues = leagues;
    }, error => {
      this.alertify.error(error);
    });
  }

  getManagers() {
  }

  addTeam() {
    if (this.model.name) {
      this.teamService.addTeam(this.model).subscribe(() => {
        this.alertify.success('Pomyślnie dodano nową drużynę.');
        this.router.navigate(['/teams']);
      }, error => {
        this.alertify.error(error);
      });
    }
  }

}
