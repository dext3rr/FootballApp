import {Routes} from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LeaguesComponent } from './leagues/leagues.component';
import { TeamsComponent } from './teams/teams.component';
import { FeedComponent } from './feed/feed.component';
import { AuthGuard } from './_guards/auth.guard';
import { AreasComponent } from './areas/areas.component';
import { AreaDetailComponent } from './areas/area-detail/area-detail.component';
import { TableComponent } from './table/table.component';
import { TeamDetailComponent } from './teams/team-detail/team-detail.component';

export const appRoutes: Routes = [
    { path: '', component: HomeComponent},
    {
        path: '',
        runGuardsAndResolvers: 'always',
        canActivate: [AuthGuard],
        children: [
            { path: 'leagues', component: LeaguesComponent},
            { path: 'teams', component: TeamsComponent},
            { path: 'teams/:id', component: TeamDetailComponent},
            { path: 'feed', component: FeedComponent},
            { path: 'areas', component: AreasComponent},
            { path: 'areas/:id', component: AreaDetailComponent},
            { path: 'leagues', component: LeaguesComponent},
            { path: 'table', component: TableComponent},
        ]
    },
    { path: '**', redirectTo: '', pathMatch: 'full'},
];

