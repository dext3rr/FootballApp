import { Component, OnInit } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap';
import { League } from 'src/app/_models/league';
import { Season } from 'src/app/_models/Season';
import { SeasonService } from 'src/app/_services/season.service';
import { LeagueService } from 'src/app/_services/league.service';
import { AlertifyService } from 'src/app/_services/alertify.service';
import { SeasonAddModalComponent } from '../season-add-modal/season-add-modal.component';
import { SeasonEditModalComponent } from '../season-edit-modal/season-edit-modal.component';
import { SeasonTeamsService } from 'src/app/_services/seasonTeams.service';
import { TeamService } from 'src/app/_services/team.service';
import { Team } from 'src/app/_models/team';
import { SeasonTeam } from 'src/app/_models/SeasonTeam';

@Component({
  selector: 'app-season-management',
  templateUrl: './season-management.component.html',
  styleUrls: ['./season-management.component.css']
})
export class SeasonManagementComponent implements OnInit {
  season: Season;
  seasons: Season[];
  leagues: League[];
  teams: Team[];
  model: any = {};
  bsModalRef: BsModalRef;

  constructor(private seasonService: SeasonService, private leagueService: LeagueService,
    private seasonTeamsService: SeasonTeamsService, private teamService: TeamService,
    private modalService: BsModalService, private alertify: AlertifyService) { }

  ngOnInit() {
    this.getSeasons();
    this.getLeagues();
  }

  getSeasons() {
    this.seasonService.getSeasons().subscribe((seasons: Season[]) => {
      this.seasons = seasons;
    }, error => {
      this.alertify.error(error);
    });
  }

  getLeagues() {
    this.leagueService.getLeagues().subscribe((leagues: League[]) => {
      this.leagues = leagues;
    }, error => {
      this.alertify.error(error);
    });
  }

  addTeamsToSeason(leagueId, seasonId, season) {
    this.teamService.getLeagueTeams(leagueId).subscribe((teams: Team[]) => {
      this.teams = teams;
      this.seasonTeamsService.generateTeams(seasonId, teams).subscribe(() => {
        this.alertify.success('Wygenerowano drużyny dla sezonu');
        this.seasonService.editSeason(seasonId, season).subscribe();
      }, error => {
        this.alertify.error(error);
      });
    }, error => {
      this.alertify.error(error);
    });
  }

  deleteTeamsFromSeason(leagueId, seasonId) {
    this.teamService.getLeagueTeams(leagueId).subscribe((teams: Team[]) => {
      this.teams = teams;
      this.seasonTeamsService.deleteTeams(seasonId, teams).subscribe(() => {
        this.alertify.success('Wyczyszczono sezon z drużyn');
      }, error => {
        this.alertify.error(error);
      });
    }, error => {
      this.alertify.error(error);
    });
  }



  addSeasonModal(leagues: League[]) {
    const initialState = {
      leagues,
    };
    this.bsModalRef = this.modalService.show(SeasonAddModalComponent, { initialState });
    this.bsModalRef.content.addNewSeason.subscribe((value) => {
      this.model.year = value.year;
      this.model.leagueId = value.leagueId;
      this.seasonService.addSeason(this.model).subscribe(() => {
        this.alertify.success('Pomyślnie dodano sezon');
        this.getSeasons();
      }, error => {
        this.alertify.error(error);
      });
    });
  }

  editSeasonModal(season: Season, leagues: League[]) {
    const initialState = {
      season,
      leagues,
    };
    this.bsModalRef = this.modalService.show(SeasonEditModalComponent, { initialState });
    this.bsModalRef.content.updateSelectedSeason.subscribe((value) => {
        this.seasonService.editSeason(season.id, season).subscribe(() => {
          this.alertify.success('Pomyślnie edytowano sezon');
          this.getSeasons();
        }, error => {
          this.alertify.error(error);
        });
    });
  }

  deleteSeason(id, seasonYear) {
    this.alertify.confirm('Czy na pewno chcesz usunąć sezon \"' + seasonYear + '\" ?', () => {
      this.seasonService.deleteSeason(id).subscribe(() => {
        this.alertify.success('Sezon został usunięty');
        this.getSeasons();
      }, error => {
        this.alertify.error('Nie udało się usunąć sezonu');
    });
  });
  }
}
