import { Injectable } from '@angular/core';
import { Headers, Http, Response } from '@angular/http';

import 'rxjs/add/operator/toPromise';

import { Task } from './task';

@Injectable()
export class TaskService {
  private tasksUrl = 'app/tasks';  // URL to web api

  constructor(private http: Http) { }

  getTasks(): Promise<Task[]> {
    return this.http
      .get(this.tasksUrl)
      .toPromise()
      .then(response => response.json().data as Task[])
      .catch(this.handleError);
  }

  getTask(id: number): Promise<Task> {
    return this.getTasks()
      .then(tasks => tasks.find(task => task.id === id));
  }

  save(task: Task): Promise<Task> {
    if (task.id) {
      return this.put(task);
    }
    return this.post(task);
  }

  delete(task: Task): Promise<Response> {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');

    let url = `${this.tasksUrl}/${task.id}`;

    return this.http
      .delete(url, { headers: headers })
      .toPromise()
      .catch(this.handleError);
  }

  // Add new Task
  private post(task: Task): Promise<Task> {
    let headers = new Headers({
      'Content-Type': 'application/json'
    });

    return this.http
      .post(this.tasksUrl, JSON.stringify(task), { headers: headers })
      .toPromise()
      .then(res => res.json().data)
      .catch(this.handleError);
  }

  // Update existing Task
  private put(task: Task): Promise<Task> {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');

    let url = `${this.tasksUrl}/${task.id}`;

    return this.http
      .put(url, JSON.stringify(task), { headers: headers })
      .toPromise()
      .then(() => task)
      .catch(this.handleError);
  }

  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error);
    return Promise.reject(error.message || error);
  }
}
