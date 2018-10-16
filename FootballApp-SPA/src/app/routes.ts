import {Routes} from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LeaguesComponent } from './leagues/leagues.component';
import { TeamsComponent } from './teams/teams.component';
import { FeedComponent } from './feed/feed.component';
import { AuthGuard } from './_guards/auth.guard';

export const appRoutes: Routes = [
    { path: '', component: HomeComponent},
    {
        path: '',
        runGuardsAndResolvers: 'always',
        canActivate: [AuthGuard],
        children: [
            { path: 'leagues', component: LeaguesComponent},
            { path: 'teams', component: TeamsComponent},
            { path: 'feed', component: FeedComponent},
        ]
    },
    { path: '**', redirectTo: '', pathMatch: 'full'},
];

