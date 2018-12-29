import { Component, OnInit } from '@angular/core';
import { AuthService } from '../_services/auth.service';
import { TeamService } from '../_services/team.service';
import { AlertifyService } from '../_services/alertify.service';
import { TeamLike } from '../_models/TeamLike';

@Component({
  selector: 'app-favourite-teams',
  templateUrl: './favourite-teams.component.html',
  styleUrls: ['./favourite-teams.component.css']
})
export class FavouriteTeamsComponent implements OnInit {

  favouriteTeams: TeamLike[];

  constructor(private authService: AuthService, private teamService: TeamService, private alertify: AlertifyService) { }

  ngOnInit() {
    this.getFavouriteTeams();
  }

  getFavouriteTeams() {
    this.teamService.getLikedTeams(this.authService.decodedToken.nameid).subscribe((favouriteTeams: TeamLike[]) => {
      this.favouriteTeams = favouriteTeams;
    }, error => {
      this.alertify.error(error);
    });
  }
}
