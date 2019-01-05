import { Injectable } from '@angular/core';
import { Router, Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { AlertifyService } from '../_services/alertify.service';
import { catchError } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import { ManagerService } from '../_services/manager.service';
import { Manager } from '../_models/Manager';

@Injectable()
export class ManagersResolver implements Resolve<Manager[]> {
    constructor(private managerService: ManagerService, private router: Router,
        private alertify: AlertifyService) {}

    resolve(route: ActivatedRouteSnapshot): Observable<Manager[]> {
        return this.managerService.getManagers().pipe(
            catchError(error => {
                this.alertify.error('Wystąpił problem podczas odczytu danych.');
                this.router.navigate(['/home']);
                return of(null);
            })
        );
    }
}
