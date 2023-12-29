// dialog.service.ts
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DialogService {
  private addListSubject = new Subject<string>();
  addList$ = this.addListSubject.asObservable();

  emitAddList(title: string) {
    this.addListSubject.next(title);
  }
}
