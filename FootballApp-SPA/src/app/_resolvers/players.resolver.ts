import { Injectable } from '@angular/core';
import { PlayerService } from '../_services/player.service';
import { Router, Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { Player } from '../_models/Player';
import { AlertifyService } from '../_services/alertify.service';
import { catchError } from 'rxjs/operators';
import { Observable, of } from 'rxjs';

@Injectable()
export class PlayersResolver implements Resolve<Player[]> {
    constructor(private playerService: PlayerService, private router: Router,
        private alertify: AlertifyService) {}

    resolve(route: ActivatedRouteSnapshot): Observable<Player[]> {
        return this.playerService.getPlayers().pipe(
            catchError(error => {
                this.alertify.error('Wystąpił problem podczas odczytu danych.');
                this.router.navigate(['/home']);
                return of(null);
            })
        );
    }
}
