import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';

import { Task } from './task';
import { TaskService } from './task.service';

@Component({
  moduleId: module.id,
  selector: 'my-task-detail',
  templateUrl: 'task-detail.component.html',
  styleUrls: ['task-detail.component.css']
})
export class TaskDetailComponent implements OnInit {
  @Input() task: Task;
  @Output() close = new EventEmitter();
  error: any;
  navigated = false; // true if navigated here

  constructor(
    private taskService: TaskService,
    private route: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.route.params.forEach((params: Params) => {
      if (params['id'] !== undefined) {
        let id = +params['id'];
        this.navigated = true;
        this.taskService.getTask(id)
            .then(task => this.task = task);
      } else {
        this.navigated = false;
        this.task = new Task();
      }
    });
  }

  save(): void {
    this.taskService
        .save(this.task)
        .then(task => {
          this.task = task; // saved task, w/ id if new
          this.goBack(task);
        })
        .catch(error => this.error = error); // TODO: Display error message
  }

  goBack(savedTask: Task = null): void {
    this.close.emit(savedTask);
    if (this.navigated) { window.history.back(); }
  }
}
