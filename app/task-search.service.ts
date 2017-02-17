import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs';

import { Task } from './task';

@Injectable()
export class TaskSearchService {
  constructor(private http: Http) { }

  search(term: string): Observable<Task[]> {
    return this.http
      .get(`app/tasks/?title=${term}`)
      .map((r: Response) => r.json().data as Task[]);
  }
}
