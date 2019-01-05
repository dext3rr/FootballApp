import { Component, OnInit, ViewChild, HostListener } from '@angular/core';
import { Team } from 'src/app/_models/team';
import { BsDatepickerConfig } from 'ngx-bootstrap';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ManagerService } from 'src/app/_services/manager.service';
import { TeamService } from 'src/app/_services/team.service';
import { AlertifyService } from 'src/app/_services/alertify.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-manager-add',
  templateUrl: './manager-add.component.html',
  styleUrls: ['./manager-add.component.css']
})
export class ManagerAddComponent implements OnInit {
  teams: Team[];
  model: any = {};
  bsConfig: Partial<BsDatepickerConfig>;
  @ViewChild('newManagerForm') newManagerForm: FormGroup;
  @HostListener('window:beforeunload', ['$event'])
  unloadNotification($event: any) {
    if (this.newManagerForm.dirty) {
      $event.returnValue = true;
    }
  }

  constructor(private managerService: ManagerService, private teamService: TeamService,
    private formBuilder: FormBuilder, private alertify: AlertifyService,
    private router: Router) { }

  ngOnInit() {
    this.createNewPlayerForm();
    this.bsConfig = {
      containerClass: 'theme-red'
    },
    this.getTeams();
  }

  createNewPlayerForm() {
    this.newManagerForm = this.formBuilder.group({
      name: ['', Validators.required],
      surname: ['', Validators.required],
      dateOfBirth: ['', Validators.required],
      country: ['', Validators.required],
      teamId: ['']
    });
  }

  getTeams() {
    this.teamService.getTeams().subscribe((teams: Team[]) => {
      this.teams = teams;
    }, error => {
      this.alertify.error(error);
    });
  }

  addManager() {
    if (this.newManagerForm.valid) {
      this.model = Object.assign({}, this.newManagerForm.value);
      this.managerService.addManager(this.model).subscribe(() => {
        this.alertify.success('Pomyślnie dodano nowego trenera');
        this.router.navigate(['/managers']);
      }, error => {
        this.alertify.error(error);
      });
    }
  }
}
