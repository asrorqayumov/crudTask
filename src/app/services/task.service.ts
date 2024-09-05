import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Task, TaskCreateResponse, TaskResponse } from '../models/ITask';
import { Observable } from 'rxjs';
import { environment } from '../environments/env';

@Injectable({ providedIn: 'root' })
export class TaskService {
  http$ = inject(HttpClient);

  constructor() {}
  private headers = new HttpHeaders({
    'Content-Type': 'application/json',
  });

  create(value: Task): Observable<TaskCreateResponse> {
    return this.http$.post<TaskCreateResponse>(
      environment.api + 'tasks',
      JSON.stringify(value),
      { headers: this.headers }
    );
  }
  update(id: number, value: Task): Observable<TaskCreateResponse> {
    return this.http$.put<TaskCreateResponse>(
      environment.api + 'tasks/' + id,
      JSON.stringify(value),
      { headers: this.headers }
    );
  }
  getAll(): Observable<TaskResponse[]> {
    return this.http$.get<TaskResponse[]>(environment.api + 'tasks');
  }
  get(id: number): Observable<TaskResponse> {
    return this.http$.get<TaskResponse>(environment.api + 'tasks/' + id);
  }
  delete(id: number): Observable<TaskResponse> { // should update
    return this.http$.delete<TaskResponse>(environment.api + 'tasks/' + id);
  }
}
