// todo.service.ts

import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class TodoService {
  private todoList = new BehaviorSubject<string[]>([]);
  private doingList = new BehaviorSubject<string[]>([]);
  private doneList = new BehaviorSubject<string[]>([]);

  todoList$ = this.todoList.asObservable();
  doingList$ = this.doingList.asObservable();
  doneList$ = this.doneList.asObservable();

  constructor() { }

  addNewList(newListName: string) {
    const currentList = this.todoList.value;
    this.todoList.next([...currentList, newListName]);
  }
}
