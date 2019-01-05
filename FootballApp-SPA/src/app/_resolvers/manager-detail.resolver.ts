import { Injectable } from '@angular/core';
import { Router, Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { AlertifyService } from '../_services/alertify.service';
import { catchError } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import { Manager } from '../_models/Manager';
import { ManagerService } from '../_services/manager.service';

@Injectable()
export class ManagerDetailResolver implements Resolve<Manager> {
    constructor(private managerService: ManagerService, private router: Router,
        private alertify: AlertifyService) {}

    resolve(route: ActivatedRouteSnapshot): Observable<Manager> {
        return this.managerService.getManager(route.params['id']).pipe(
            catchError(error => {
                this.alertify.error('Wystąpił problem podczas odczytu danych.');
                this.router.navigate(['/players']);
                return of(null);
            })
        );
    }
}
