import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { Task } from './task';
import { TaskService } from './task.service';

@Component({
  moduleId: module.id,
  selector: 'my-dashboard',
  templateUrl: 'dashboard.component.html',
  styleUrls: ['dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  tasks: Task[] = [];

  constructor(
    private router: Router,
    private taskService: TaskService) {
  }

  ngOnInit(): void {
    this.taskService.getTasks()
      .then(tasks => this.tasks = tasks.slice(1, 5));
  }

  gotoDetail(task: Task): void {
    let link = ['/detail', task.id];
    this.router.navigate(link);
  }
}
