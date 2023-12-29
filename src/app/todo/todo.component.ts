// Import statements
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { DialogComponent } from '../dialog/dialog.component';
import { TodoService } from './todo.service';
import { DialogService } from '../dialog/dialog.service';

import { MatDialog } from '@angular/material/dialog';
import { CdkDragDrop, CdkDrag, CdkDropList, CdkDropListGroup, moveItemInArray, transferArrayItem} from '@angular/cdk/drag-drop';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatListModule } from '@angular/material/list';
import {MatFormFieldModule} from '@angular/material/form-field'; 
import { MatInputModule } from '@angular/material/input';


@Component({
  selector: 'app-todo',
  standalone: true,
  imports: [
    CommonModule,
    DialogComponent,
    FormsModule,
    CdkDrag,
    CdkDropList,
    CdkDropListGroup,
    MatCardModule,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    MatMenuModule,
    MatListModule,
    MatFormFieldModule,
    MatInputModule
  ],
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.scss'],
})


export class TodoComponent implements OnInit {
  imagePath: string = '../../assets/trianglify-lowres.jpg';
  
  constructor(private todoService: TodoService, public dialog: MatDialog,private dialogService: DialogService) {}
  
  ngOnInit(): void {
    // Subscribe to changes in the todoList
    this.todoService.todoList$.subscribe(list => this.todoList = list);
    
    // Subscribe to the addition of a new custom list
    this.dialogService.addList$.subscribe((title) => {
      // Show the custom list and set its title
      this.showCustomList = true;
      this.customListTitle = title;
    });
  }
  
  // Initial lists
  todo = ['Get to work', 'Pick up groceries', 'Go home', 'Fall asleep'];
  doing = ['Study', 'English lessons', 'Go to gym', 'Meet your love'];
  done = ['Get up', 'Brush teeth', 'Take a shower', 'Check e-mail', 'Walk dog'];

  // Empty arrays for dynamic lists
  todoList: string[] = [];
  lists: string[] = [];
  isCardVisible = false;
  showCustomListInput: boolean = false;
  customListTitleInput: string = '';
  showCustomList: boolean = false;
  customListTitle: string = 'Custom List';
  showEditButton: boolean[] = Array(this.todo.length).fill(false);
  customList: string[] = [];
  addingCard = false;
  newCardTitle = '';
  isEditing: boolean = false;
  editedItem: string = '';
  editing = false;
  editedTitle: string = 'Doing'

  startAddingCard() {
    this.addingCard = true;
    this.newCardTitle = '';
  }
  
  cancelAddingCard() {
    this.addingCard = false;
  }

  // Adding new card to column
  addCard(listType: string) {
    if (this.newCardTitle.trim() !== '') {
      switch (listType) {
        case 'todo':
          this.todo.push(this.newCardTitle);
          break;
        case 'doing':
          this.doing.push(this.newCardTitle);
          break;
        case 'done':
          this.done.push(this.newCardTitle);
          break;
        case 'customList':
          this.customList.push(this.newCardTitle);
          break;
      }

      // Reset the state
      this.newCardTitle = '';
      this.addingCard = false;
    }
  }

  // Toggle visibility of the card
  showCard() {
    this.isCardVisible = !this.isCardVisible;
  }

  // Show input for creating a custom list
  createCustomList() {
    this.showCustomListInput = true;
  }

  // Submit the custom list title
  submitCustomList() {
    this.customListTitle = this.customListTitleInput;
    this.showCustomList = true;
    this.showCustomListInput = false;
  }

  // Toggle the visibility of the edit button
  toggleEditButton(show: boolean, index: number): void {
    this.showEditButton[index] = true;
  }
  
  // Handle adding a list with a specific title
  handleAddList(title: string) {
    this.showCustomList = true;
    this.customListTitle = title;
  }


  // Handle on editing cards
  onEditClick(item: string): void {
    this.isEditing = true;
    this.editedItem = item;
  }
  
  // Function to handle the "Save" button click during editing
  onSaveClick(index: number): void {
    this.todo[index] = this.editedItem;
    this.isEditing = false;
  } 
 
  // Handle on deleting cards 
  onDeleteClick(item: string): void {  
    this.todo.splice(this.todo.indexOf(item), 1);
  }

  startEditing(){
    this.editing = true;
  }

  stopEditing(){
    this.editing = false
  }

  // Drag and Drop
  drop(event: CdkDragDrop<string[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex,
      );
    }
  }

  // Opening Dialog
  openDialog(): void {
    // Open the dialog
    const dialogRef = this.dialog.open(DialogComponent, {
      width: '300px',
      data: {}
    });

    // Subscribe to the dialog result
    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed with result:', result);
      if (result) {
        // Add a new list based on the dialog result
        this.todoService.addNewList(result);
      }
    });
  }
}