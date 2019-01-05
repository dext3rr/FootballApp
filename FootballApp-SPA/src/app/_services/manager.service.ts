import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Manager } from '../_models/Manager';

@Injectable({
  providedIn: 'root'
})
export class ManagerService {
  baseUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }

  getManager(id): Observable<Manager> {
    return this.http.get<Manager>(this.baseUrl + 'managers/' + id);
  }

  getManagers(): Observable<Manager[]> {
    return this.http.get<Manager[]>(this.baseUrl + 'managers');
  }

  addManager(model: any) {
    return this.http.post<Manager>(this.baseUrl + 'managers/addManager', model);
  }

  deleteManager(id: number) {
    return this.http.delete<Manager>(this.baseUrl + 'managers/' + id + '/deleteManager');
  }

  updateManager(id: number, manager: Manager) {
    return this.http.put(this.baseUrl + 'managers/' + id, manager);
  }
}
