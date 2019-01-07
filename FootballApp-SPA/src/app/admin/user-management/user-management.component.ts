import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/_models/User';
import { AdminService } from 'src/app/_services/admin.service';
import { AlertifyService } from 'src/app/_services/alertify.service';
import { BsModalService, BsModalRef } from 'ngx-bootstrap';
import { RolesModalComponent } from '../roles-modal/roles-modal.component';

@Component({
  selector: 'app-user-management',
  templateUrl: './user-management.component.html',
  styleUrls: ['./user-management.component.css']
})
export class UserManagementComponent implements OnInit {
  users: User[];
  bsModalRef: BsModalRef;

  constructor(private adminService: AdminService, private modalService: BsModalService,
    private alertifyService: AlertifyService) { }

  ngOnInit() {
    this.getUsersWithRoles();
  }

  getUsersWithRoles() {
    this.adminService.getUserRoles().subscribe((users: User[]) => {
      this.users = users;
    }, error => {
      this.alertifyService.error(error);
    });
  }

  deleteUser(id: number, username: string) {
    this.alertifyService.confirm('Czy na pewno chcesz usunąć użytkownika o nazwie \"' + username + '\" ?', () => {
      this.adminService.deleteUser(id).subscribe(() => {
        this.alertifyService.success('Użytkownik został usunięty.');
        this.getUsersWithRoles();
      }, error => {
        this.alertifyService.error('Nie udało się usunąć użytkownika.');
    });
  });
  }

  editRolesModal(user: User) {
    const initialState = {
      user,
      roles: this.getRoles(user)
    };
    this.bsModalRef = this.modalService.show(RolesModalComponent, {initialState});
    this.bsModalRef.content.updateSelectedRoles.subscribe((values) => {
      const rolesToUpdate = {
        roleNames: [...values.filter(el => el.checked === true).map(el => el.name)]
      };
      if (rolesToUpdate) {
        this.adminService.updateUserRoles(user, rolesToUpdate).subscribe(() => {
          user.roles = [...rolesToUpdate.roleNames];
        }, error => {
          this.alertifyService.error(error);
        });
      }
    });
  }

  private getRoles(user) {
    const roles = [];
    const userRoles = user.roles;
    const availableRoles: any[] = [
      {name: 'Administrator', value: 'Administrator'},
      {name: 'Moderator', value: 'Moderator'},
      {name: 'Użytkownik', value: 'Użytkownik'},
    ];

    for (let i = 0; i < availableRoles.length; i++) {
      let isMatch = false;
      for (let j = 0; j < userRoles.length; j++) {
        if (availableRoles[i].name === userRoles[j]) {
          isMatch = true;
          availableRoles[i].checked = true;
          roles.push(availableRoles[i]);
          break;
        }
      }
      if (!isMatch) {
        availableRoles[i].checked = false;
        roles.push(availableRoles[i]);
      }
    }
    return roles;
  }

}
