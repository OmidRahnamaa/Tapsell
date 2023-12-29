import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { DialogComponent } from "./dialog/dialog.component";
import { TodoComponent } from "./todo/todo.component";

@Component({
    selector: 'app-root',
    standalone: true,
    templateUrl: './app.component.html',
    styleUrl: './app.component.scss',
    imports: [CommonModule, RouterOutlet, DialogComponent, TodoComponent]
})
export class AppComponent {
handleAddList($event: string) {
throw new Error('Method not implemented.');
}
  title = 'TodoList';
}
