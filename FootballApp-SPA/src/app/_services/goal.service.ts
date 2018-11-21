import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Goal } from '../_models/Goal';

@Injectable({
  providedIn: 'root'
})
export class GoalService {
  baseUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }

  getGoal(id): Observable<Goal> {
    return this.http.get<Goal>(this.baseUrl + 'goals/' + id);
  }

  getMatchGoals(id): Observable<Goal[]> {
    return this.http.get<Goal[]>(this.baseUrl + 'goals/matchGoals/' + id);
  }

  addGoal(model: any) {
    return this.http.post<Goal>(this.baseUrl + 'goals/addGoal', model);
  }

  deleteGoal(id: number) {
    return this.http.delete<Goal>(this.baseUrl + 'goals/' + id + '/deleteGoal');
  }
}
