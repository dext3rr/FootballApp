import { Component, OnInit } from '@angular/core';
import { Manager } from 'src/app/_models/Manager';
import { Team } from 'src/app/_models/team';
import { AuthService } from 'src/app/_services/auth.service';
import { ManagerService } from 'src/app/_services/manager.service';
import { TeamService } from 'src/app/_services/team.service';
import { AlertifyService } from 'src/app/_services/alertify.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-manager-detail',
  templateUrl: './manager-detail.component.html',
  styleUrls: ['./manager-detail.component.css']
})
export class ManagerDetailComponent implements OnInit {
  manager: Manager;
  team: Team;
  teamId: number;

  constructor(private authService: AuthService, private managerService: ManagerService,
    private teamService: TeamService, private alertify: AlertifyService,
    private router: Router, private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.data.subscribe(data => {
      this.manager = data['manager'];
      this.loadTeam();
    });
  }

  loadTeam() {
    this.teamId = this.manager.teamId;
    this.teamService.getTeam(+this.teamId).subscribe((team: Team) => {
      this.team = team;
    }, error => {
      this.alertify.error(error);
    });
  }

  deleteManager() {
    this.alertify.confirm('Czy na pewno chcesz usunąć trenera?', () => {
      this.managerService.deleteManager(this.manager.id).subscribe(() => {
        this.alertify.success('Trener został usunięty.');
        this.router.navigate(['/managers']);
      }, error => {
        this.alertify.error('Nie udało się usunąć trenera.');
      });
    });
  }
}
