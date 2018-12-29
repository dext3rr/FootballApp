import { Injectable } from '@angular/core';
import { Router, Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { AlertifyService } from '../_services/alertify.service';
import { catchError } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import { Team } from '../_models/team';
import { TeamService } from '../_services/team.service';

@Injectable()
export class TeamDetailResolver implements Resolve<Team> {
    constructor(private teamService: TeamService, private router: Router,
        private alertify: AlertifyService) {}

    resolve(route: ActivatedRouteSnapshot): Observable<Team> {
        return this.teamService.getTeam(route.params['id']).pipe(
            catchError(error => {
                this.alertify.error('Wystąpił problem podczas odczytu danych.');
                this.router.navigate(['/teams']);
                return of(null);
            })
        );
    }
}
