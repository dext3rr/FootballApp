import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { User } from '../_models/User';

@Injectable({
  providedIn: 'root'
})
export class AdminService {
  baseUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }

  getUserRoles() {
    return this.http.get(this.baseUrl + 'admin/userRoles');
  }

  updateUserRoles(user: User, roles: {}) {
    return this.http.post(this.baseUrl + 'admin/editRoles/' + user.username, roles);
  }

  deleteUser(id: number) {
    return this.http.delete<User>(this.baseUrl + 'admin/users/' + id + '/deleteUser');
  }
}
