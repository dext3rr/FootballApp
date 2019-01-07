import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {HttpClientModule} from '@angular/common/http';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { BsDropdownModule, TabsModule, BsDatepickerModule, ModalModule } from 'ngx-bootstrap';
import { RouterModule } from '@angular/router';
import { JwtModule } from '@auth0/angular-jwt';
import { MatButtonModule } from '@angular/material/button';

import { AppComponent } from './app.component';
import { NavComponent } from './nav/nav.component';
import { AuthService } from './_services/auth.service';
import { HomeComponent } from './home/home.component';
import { RegisterComponent } from './register/register.component';
import { ErrorInterceptorProvider } from './_services/error.interceptor';
import { AlertifyService } from './_services/alertify.service';
import { LeaguesComponent } from './leagues/leagues.component';
import { TeamsComponent } from './teams/teams.component';
import { appRoutes } from './routes';
import { FeedComponent } from './feed/feed.component';
import { AuthGuard } from './_guards/auth.guard';
import { FooterComponent } from './footer/footer.component';
import { TeamService } from './_services/team.service';
import { AreasComponent } from './areas/areas.component';
import { AreaService } from './_services/area.service';
import { MatCardModule } from '@angular/material/card';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatTableModule } from '@angular/material/table';
import { MatTabsModule } from '@angular/material/tabs';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TableComponent } from './table/table.component';
import { TeamDetailComponent } from './teams/team-detail/team-detail.component';
import { PlayerComponent } from './player/player.component';
import { PlayerEditComponent } from './player/player-edit/player-edit.component';
import { PlayerDetailComponent } from './player/player-detail/player-detail.component';
import { PlayerEditResolver } from './_resolvers/player-edit.resolver';
import { PreventUnsavedChanges } from './_guards/prevent-unsaved-changes.guard';
import { PlayerCardComponent } from './player/player-card/player-card.component';
import { PlayerDetailResolver } from './_resolvers/player-detail.resolver';
import { PlayersResolver } from './_resolvers/players.resolver';
import { TeamsResolver } from './_resolvers/teams.resolver';
import { TeamCardComponent } from './teams/team-card/team-card.component';
import { FixturesComponent } from './fixtures/fixtures.component';
import { FixtureDetailComponent } from './fixtures/fixture-detail/fixture-detail.component';
import { MatchesComponent } from './matches/matches.component';
import { MatchEditComponent } from './matches/match-edit/match-edit.component';
import { AdminPanelComponent } from './admin/admin-panel/admin-panel.component';
import { HasRoleDirective } from './_directives/hasRole.directive';
import { UserManagementComponent } from './admin/user-management/user-management.component';
import { AdminService } from './_services/admin.service';
import { RolesModalComponent } from './admin/roles-modal/roles-modal.component';
import { AreaManagementComponent } from './admin/area-management/area-management.component';
import { AreaEditModalComponent } from './admin/area-edit-modal/area-edit-modal.component';
import { AreaAddModalComponent } from './admin/area-add-modal/area-add-modal.component';
import { LeagueManagementComponent } from './admin/league-management/league-management.component';
import { LeagueAddModalComponent } from './admin/league-add-modal/league-add-modal.component';
import { LeagueEditModalComponent } from './admin/league-edit-modal/league-edit-modal.component';
import { SeasonAddModalComponent } from './admin/season-add-modal/season-add-modal.component';
import { SeasonManagementComponent } from './admin/season-management/season-management.component';
import { SeasonEditModalComponent } from './admin/season-edit-modal/season-edit-modal.component';
import { SeasonService } from './_services/season.service';
import { SeasonTeamsService } from './_services/seasonTeams.service';
import { FavouriteTeamsComponent } from './favourite-teams/favourite-teams.component';
import { FavouritePlayersComponent } from './favourite-players/favourite-players.component';
import { TeamAddComponent } from './teams/team-add/team-add.component';
import { TeamEditComponent } from './teams/team-edit/team-edit.component';
import { TeamEditResolver } from './_resolvers/team-edit-resolver';
import { TeamDetailResolver } from './_resolvers/team-detail-resolver';
import { PlayerAddComponent } from './player/player-add/player-add.component';
import { ManagersComponent } from './managers/managers.component';
import { ManagerAddComponent } from './managers/manager-add/manager-add.component';
import { ManagerCardComponent } from './managers/manager-card/manager-card.component';
import { ManagerDetailComponent } from './managers/manager-detail/manager-detail.component';
import { ManagerEditComponent } from './managers/manager-edit/manager-edit.component';
import { ManagersResolver } from './_resolvers/managers.resolver';
import { ManagerDetailResolver } from './_resolvers/manager-detail.resolver';

export function tokenGetter() {
   return localStorage.getItem('token');
}

@NgModule({
   declarations: [
      AppComponent,
      NavComponent,
      HomeComponent,
      RegisterComponent,
      LeaguesComponent,
      TeamsComponent,
      TeamAddComponent,
      TeamEditComponent,
      TeamCardComponent,
      FeedComponent,
      FooterComponent,
      FooterComponent,
      AreasComponent,
      TableComponent,
      TeamDetailComponent,
      PlayerComponent,
      PlayerDetailComponent,
      PlayerEditComponent,
      PlayerCardComponent,
      FixturesComponent,
      FixtureDetailComponent,
      MatchesComponent,
      MatchEditComponent,
      AdminPanelComponent,
      HasRoleDirective,
      UserManagementComponent,
      AreaManagementComponent,
      LeagueManagementComponent,
      RolesModalComponent,
      AreaAddModalComponent,
      AreaEditModalComponent,
      LeagueAddModalComponent,
      LeagueEditModalComponent,
      SeasonManagementComponent,
      SeasonAddModalComponent,
      SeasonEditModalComponent,
      FavouriteTeamsComponent,
      FavouritePlayersComponent,
      PlayerAddComponent,
      ManagersComponent,
      ManagerAddComponent,
      ManagerCardComponent,
      ManagerDetailComponent,
      ManagerEditComponent
   ],
   imports: [
      BrowserModule,
      HttpClientModule,
      FormsModule,
      ReactiveFormsModule,
      BsDropdownModule.forRoot(),
      BsDatepickerModule.forRoot(),
      RouterModule.forRoot(appRoutes),
      ModalModule.forRoot(),
      MatCardModule,
      MatSelectModule,
      MatFormFieldModule,
      MatButtonModule,
      BrowserAnimationsModule,
      MatTabsModule,
      MatTableModule,
      TabsModule.forRoot(),
      JwtModule.forRoot({
         config: {
            tokenGetter: tokenGetter,
            whitelistedDomains: ['localhost:5000'],
            blacklistedRoutes: ['localhost:5000/api/auth']
         }
      })
],
   providers: [
      AuthService,
      ErrorInterceptorProvider,
      AlertifyService,
      AuthGuard,
      TeamService,
      AreaService,
      SeasonService,
      SeasonTeamsService,
      ManagersResolver,
      ManagerDetailResolver,
      TeamsResolver,
      TeamEditResolver,
      TeamDetailResolver,
      PlayersResolver,
      PlayerDetailResolver,
      PlayerEditResolver,
      PreventUnsavedChanges,
      AdminService
   ],
   entryComponents: [
      RolesModalComponent,
      AreaAddModalComponent,
      AreaEditModalComponent,
      LeagueAddModalComponent,
      LeagueEditModalComponent,
      SeasonAddModalComponent,
      SeasonEditModalComponent
   ],
   bootstrap: [
      AppComponent
   ]
})
export class AppModule { }
