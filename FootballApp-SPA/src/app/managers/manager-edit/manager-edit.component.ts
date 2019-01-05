import { Component, OnInit, ViewChild, HostListener } from '@angular/core';
import { Manager } from 'src/app/_models/Manager';
import { Team } from 'src/app/_models/team';
import { BsDatepickerConfig } from 'ngx-bootstrap';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertifyService } from 'src/app/_services/alertify.service';
import { ManagerService } from 'src/app/_services/manager.service';
import { TeamService } from 'src/app/_services/team.service';

@Component({
  selector: 'app-manager-edit',
  templateUrl: './manager-edit.component.html',
  styleUrls: ['./manager-edit.component.css']
})
export class ManagerEditComponent implements OnInit {
  manager: Manager;
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
    private managerService: ManagerService, private teamService: TeamService, private router: Router) { }

  ngOnInit() {
    this.bsConfig = {
      containerClass: 'theme-red'
    },
    this.route.data.subscribe(data => {
      this.manager = data['manager'];
    });
    this.getTeams();
  }

  updateManager() {
    this.managerService.updateManager(this.manager.id, this.manager).subscribe(next => {
      this.alertify.success('Zaktualizowano trenera');
      this.editForm.reset(this.manager);
      this.router.navigate(['/managers/' + this.manager.id]);
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
