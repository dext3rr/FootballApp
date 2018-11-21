import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {HttpClientModule} from '@angular/common/http';
import {FormsModule} from '@angular/forms';
import { BsDropdownModule, TabsModule, BsDatepickerModule } from 'ngx-bootstrap';
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
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AreaDetailComponent } from './areas/area-detail/area-detail.component';
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
import { PlayerAddComponent } from './player/player-add/player-add.component';
import { FixturesComponent } from './fixtures/fixtures.component';
import { FixtureDetailComponent } from './fixtures/fixture-detail/fixture-detail.component';
import { MatchesComponent } from './matches/matches.component';

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
      TeamCardComponent,
      FeedComponent,
      FooterComponent,
      FooterComponent,
      AreasComponent,
      AreaDetailComponent,
      TableComponent,
      TeamDetailComponent,
      PlayerComponent,
      PlayerDetailComponent,
      PlayerAddComponent,
      PlayerEditComponent,
      PlayerCardComponent,
      FixturesComponent,
      FixtureDetailComponent,
      MatchesComponent
   ],
   imports: [
      BrowserModule,
      HttpClientModule,
      FormsModule,
      BsDropdownModule.forRoot(),
      BsDatepickerModule.forRoot(),
      RouterModule.forRoot(appRoutes),
      MatCardModule,
      MatSelectModule,
      MatFormFieldModule,
      MatButtonModule,
      BrowserAnimationsModule,
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
      TeamsResolver,
      PlayersResolver,
      PlayerDetailResolver,
      PlayerEditResolver,
      PreventUnsavedChanges,
   ],
   bootstrap: [
      AppComponent
   ]
})
export class AppModule { }
