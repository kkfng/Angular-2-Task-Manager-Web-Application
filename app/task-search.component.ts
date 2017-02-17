import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';

import { TaskSearchService } from './task-search.service';
import { Task } from './task';

@Component({
  moduleId: module.id,
  selector: 'task-search',
  templateUrl: 'task-search.component.html',
  styleUrls: ['task-search.component.css'],
  providers: [TaskSearchService]
})
export class TaskSearchComponent implements OnInit {
  tasks: Observable<Task[]>;
  private searchTerms = new Subject<string>();

  constructor(
    private taskSearchService: TaskSearchService,
    private router: Router) { }

  search(term: string): void {
    // Push a search term into the observable stream.
    this.searchTerms.next(term);
  }

  ngOnInit(): void {
    this.tasks = this.searchTerms
      .debounceTime(100)        // wait for 100ms pause in events
      .distinctUntilChanged()   // ignore if next search term is same as previous
      .switchMap(term => term   // switch to new observable each time
        // return the http search observable
        ? this.taskSearchService.search(term)
        // or the observable of empty tasks if no search term
        : Observable.of<Task[]>([]))
      .catch(error => {
        // TODO: real error handling
        console.log(error);
        return Observable.of<Task[]>([]);
      });
  }

  gotoDetail(task: Task): void {
    let link = ['/detail', task.id];
    this.router.navigate(link);
  }
}
