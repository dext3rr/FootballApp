import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {HttpClientModule} from '@angular/common/http';
import {FormsModule} from '@angular/forms';
import { BsDropdownModule } from 'ngx-bootstrap';
import { RouterModule } from '@angular/router';

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
import {MatCardModule} from '@angular/material/card';
import { AreaDetailComponent } from './areas/area-detail/area-detail.component';



@NgModule({
   declarations: [
      AppComponent,
      NavComponent,
      HomeComponent,
      RegisterComponent,
      LeaguesComponent,
      TeamsComponent,
      FeedComponent,
      FooterComponent,
      FooterComponent,
      AreasComponent,
      AreaDetailComponent
   ],
   imports: [
      BrowserModule,
      HttpClientModule,
      FormsModule,
      BsDropdownModule.forRoot(),
      RouterModule.forRoot(appRoutes),
      MatCardModule
   ],
   providers: [
      AuthService,
      ErrorInterceptorProvider,
      AlertifyService,
      AuthGuard,
      TeamService,
      AreaService
   ],
   bootstrap: [
      AppComponent
   ]
})
export class AppModule { }
