import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { Task } from './task';
import { TaskService } from './task.service';

@Component({
  moduleId: module.id,
  selector: 'my-tasks',
  templateUrl: 'tasks.component.html',
  styleUrls: ['tasks.component.css']
})
export class TasksComponent implements OnInit {
  tasks: Task[];
  selectedTask: Task;
  addingTask = false;
  error: any;

  constructor(
    private router: Router,
    private taskService: TaskService) { }

  getTasks(): void {
    this.taskService
      .getTasks()
      .then(tasks => this.tasks = tasks)
      .catch(error => this.error = error);
  }

  addTask(): void {
    this.addingTask = true;
    this.selectedTask = null;
  }

  close(savedTask: Task): void {
    this.addingTask = false;
    if (savedTask) { this.getTasks(); }
  }

  deleteTask(task: Task, event: any): void {
    event.stopPropagation();
    this.taskService
      .delete(task)
      .then(res => {
        this.tasks = this.tasks.filter(h => h !== task);
        if (this.selectedTask === task) { this.selectedTask = null; }
      })
      .catch(error => this.error = error);
  }

  ngOnInit(): void {
    this.getTasks();
  }

  onSelect(task: Task): void {
    this.selectedTask = task;
    this.addingTask = false;
  }

  gotoDetail(): void {
    this.router.navigate(['/detail', this.selectedTask.id]);
  }
}
