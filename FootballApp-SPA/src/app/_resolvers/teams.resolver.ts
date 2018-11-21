import { Injectable } from '@angular/core';
import { Router, Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { AlertifyService } from '../_services/alertify.service';
import { catchError } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import { TeamService } from '../_services/team.service';
import { Team } from '../_models/team';

@Injectable()
export class TeamsResolver implements Resolve<Team[]> {
    constructor(private teamService: TeamService, private router: Router,
        private alertify: AlertifyService) {}

    resolve(route: ActivatedRouteSnapshot): Observable<Team[]> {
        return this.teamService.getTeams().pipe(
            catchError(error => {
                this.alertify.error('Wystąpił problem podczas odczytu danych.');
                this.router.navigate(['/home']);
                return of(null);
            })
        );
    }
}
