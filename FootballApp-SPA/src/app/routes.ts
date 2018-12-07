import {Routes} from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LeaguesComponent } from './leagues/leagues.component';
import { TeamsComponent } from './teams/teams.component';
import { FeedComponent } from './feed/feed.component';
import { AuthGuard } from './_guards/auth.guard';
import { AreasComponent } from './areas/areas.component';
import { TableComponent } from './table/table.component';
import { TeamDetailComponent } from './teams/team-detail/team-detail.component';
import { PlayerComponent } from './player/player.component';
import { PlayerDetailComponent } from './player/player-detail/player-detail.component';
import { PlayerEditComponent } from './player/player-edit/player-edit.component';
import { PlayerEditResolver } from './_resolvers/player-edit.resolver';
import { PreventUnsavedChanges } from './_guards/prevent-unsaved-changes.guard';
import { PlayerDetailResolver } from './_resolvers/player-detail.resolver';
import { PlayersResolver } from './_resolvers/players.resolver';
import { TeamsResolver } from './_resolvers/teams.resolver';
import { PlayerAddComponent } from './player/player-add/player-add.component';
import { FixtureDetailComponent } from './fixtures/fixture-detail/fixture-detail.component';
import { MatchesComponent } from './matches/matches.component';
import { MatchEditComponent } from './matches/match-edit/match-edit.component';
import { AdminPanelComponent } from './admin/admin-panel/admin-panel.component';

export const appRoutes: Routes = [
    { path: '', component: HomeComponent},
    {
        path: '',
        runGuardsAndResolvers: 'always',
        canActivate: [AuthGuard],
        children: [
            { path: 'admin', component: AdminPanelComponent,
            data: {roles: ['Administrator', 'Moderator']}},
            { path: 'leagues', component: LeaguesComponent},
            { path: 'teams', component: TeamsComponent,
            resolve: {teams: TeamsResolver}},
            { path: 'teams/:id', component: TeamDetailComponent},
            { path: 'feed', component: FeedComponent},
            { path: 'areas', component: AreasComponent},
            { path: 'areas/:id', component: LeaguesComponent},
            { path: 'leagues', component: LeaguesComponent},
            { path: 'table', component: TableComponent},
            { path: 'players', component: PlayerComponent,
            resolve: {players: PlayersResolver}},
            { path: 'player/:id', component: PlayerDetailComponent,
            resolve: {player: PlayerDetailResolver}},
            { path: 'players/addPlayer', component: PlayerAddComponent},
            { path: 'player/:id/edit', component: PlayerEditComponent,
            resolve: {player: PlayerEditResolver}, canDeactivate: [PreventUnsavedChanges]},
            { path: 'leagues/:id', component: TableComponent},
            { path: 'fixtures/:id', component: FixtureDetailComponent },
            { path: 'matches/:id', component: MatchesComponent},
            { path: 'matches/:id/edit', component: MatchEditComponent}
        ]
    },
    { path: '**', redirectTo: '', pathMatch: 'full'},
];

