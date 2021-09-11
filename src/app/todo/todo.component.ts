import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { DataService } from '../data.service';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.css']
})
export class TodoComponent implements OnInit {
  @ViewChild('closeModal') closeModal: ElementRef;
  editValue: string = '';
  todoArray: string[] = this.ds.getData() || [];
  todo: any;
  todoForm: any;
  editOldValue: any;
  editValuePosition: any;

  constructor(private ds: DataService) { }

  ngOnInit(): void {
  }

  addTodo(val: string) {
    if (val != '') {
      this.todoArray.push(val);
      this.ds.setData(this.todoArray);
      this.todoForm.resetForm();
      //console.log(this.todos) 
    } else {
      alert('Field required **')
    }
  }

  /*delete item*/
  deleteItem(todo: any) {
    let cnf = confirm("Do you really want to delete?");
    if (cnf) {
      let i = this.todoArray.indexOf(todo);
      this.todoArray.splice(i, 1);
      this.ds.setData(this.todoArray);
    }
  }

  // submit Form
  todoSubmit(val: { todo: string }) {
    if (val.todo && val.todo != '') {
      this.todoArray.push(val.todo);
      this.ds.setData(this.todoArray);
    } else {
      alert('Field required **')
    }
  }

  editItem(todo: any): void {
    this.editValue = todo;
    this.editOldValue = todo;
  }

  // Saving edited data
  saveEditChanges(): void {
    console.log("Edit item value", this.editValue);
    let index = this.todoArray.indexOf(this.editOldValue);
    this.todoArray[index] = this.editValue;
    this.ds.setData(this.todoArray);
    let el: HTMLElement = this.closeModal.nativeElement;
    el.click();
  }

}
