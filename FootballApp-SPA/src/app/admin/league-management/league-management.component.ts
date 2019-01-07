import { Component, OnInit } from '@angular/core';
import { League } from 'src/app/_models/league';
import { BsModalRef, BsModalService } from 'ngx-bootstrap';
import { LeagueService } from 'src/app/_services/league.service';
import { AlertifyService } from 'src/app/_services/alertify.service';
import { LeagueAddModalComponent } from '../league-add-modal/league-add-modal.component';
import { AreaService } from 'src/app/_services/area.service';
import { Area } from 'src/app/_models/area';
import { LeagueEditModalComponent } from '../league-edit-modal/league-edit-modal.component';

@Component({
  selector: 'app-league-management',
  templateUrl: './league-management.component.html',
  styleUrls: ['./league-management.component.css']
})
export class LeagueManagementComponent implements OnInit {
  league: League;
  leagues: League[];
  areas: Area[];
  model: any = {};
  bsModalRef: BsModalRef;

  constructor(private leagueService: LeagueService, private areaService: AreaService,
    private modalService: BsModalService, private alertify: AlertifyService) { }

  ngOnInit() {
    this.getLeagues();
    this.getAreas();
  }

  getLeagues() {
    this.leagueService.getLeagues().subscribe((leagues: League[]) => {
      this.leagues = leagues;
    }, error => {
      this.alertify.error(error);
    });
  }

  getAreas() {
    this.areaService.getAreas().subscribe((areas: Area[]) => {
      this.areas = areas;
    }, error => {
      this.alertify.error(error);
    });
  }

  addLeagueModal(areas: Area[]) {
    const initialState = {
      areas,
    };
    this.bsModalRef = this.modalService.show(LeagueAddModalComponent, { initialState });
    this.bsModalRef.content.addNewLeague.subscribe((value) => {
      this.model.name = value.name;
      this.model.areaId = value.areaId;
      this.leagueService.addLeague(this.model).subscribe(() => {
        this.alertify.success('Pomyślnie dodano okręg');
        this.getLeagues();
      }, error => {
        this.alertify.error(error);
      });
    });
  }

  editLeagueModal(league: League, areas: Area[]) {
    const initialState = {
      league,
      areas,
    };
    this.bsModalRef = this.modalService.show(LeagueEditModalComponent, { initialState });
    this.bsModalRef.content.updateSelectedLeague.subscribe((value) => {
        this.leagueService.editLeague(league.id, league).subscribe(() => {
          this.alertify.success('Pomyślnie edytowano ligę');
          this.getLeagues();
        }, error => {
          this.alertify.error(error);
        });
    });
  }

  deleteLeague(id, leagueName) {
    this.alertify.confirm('Czy na pewno chcesz usunąć ligę o nazwie \"' + leagueName + '\" ?', () => {
      this.leagueService.deleteLeague(id).subscribe(() => {
        this.alertify.success('Liga została usunięta.');
        this.getLeagues();
      }, error => {
        this.alertify.error('Nie udało się usunąć ligi.');
    });
  });
  }
}
