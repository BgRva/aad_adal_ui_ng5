import { Component, OnInit } from '@angular/core';
import { DataService } from '../_core/services/data.service';
import { LoggerService } from '../_core/services/logger.service';
import { TodoItem } from '../_models/todo-item';

@Component({
  selector: 'app-todos',
  templateUrl: './todos.component.html',
  styleUrls: ['./todos.component.css']
})
export class TodosComponent implements OnInit {

  todos: TodoItem[];
  newCaption: string;
  tmpCaption: string;
  editingInProgress: boolean;
  tmpTodo: TodoItem;

  constructor(private dataSrvc: DataService, private logger: LoggerService) { }

  ngOnInit() {
    this.populate();
    this.logger.notifyInfo('Todo view activated');
  }

  populate(): void {
    this.dataSrvc.getTodos().subscribe(
      todos => {
        this.todos = todos;
      },
      (errorMsg: string) => {
        this.logger.notifyError('getTodos() error: could not retrieve todo items', 'Fail');
      }
    );
  }

  add(): void {
    const todo = new TodoItem();
    todo.description = this.newCaption;
    todo.team = 'Goons';
    todo.faction = 'Horde';
    todo.owner = 'Barney Rubble';

    this.dataSrvc.createTodo(todo).subscribe(
      result => {
        this.todos.push(todo);
        this.newCaption = null;
        this.logger.notifySuccess(`Todo created with id=${result.id}`, 'Success');
      },
      (errorMsg: string) => {
        this.logger.notifyError('createTodo() error: could not create a new Todo item.', 'Fail');
      }
    );
  }

  update(index: number): void {
    const target = Object.assign({}, this.todos[index]);
    target.description = this.tmpCaption;
    target.edit = undefined;
    this.dataSrvc.updateTodo(target).subscribe(
      todo => {
        this.todos[index] = todo;
        this.logger.notifySuccess(`Todo ${todo.id} updated`, 'Success');
      },
      (errorMsg: string) => {
        this.logger.notifyError('update() error: could not update todo item.', 'Fail');
      }
    );
  }

  remove(index: number): void {
    const todo = this.todos[index];
    this.dataSrvc.deleteTodo(todo.id).subscribe(
      result => {
        this.todos.splice(index, 1);
        this.logger.notifySuccess(`Todo ${result.id} deleted`, 'Success');
      },
      (errorMsg: string) => {
        this.logger.notifyError('remove() error: could not delete todo item.', 'Fail');
      }
    );
  }

  editSwitch(todo: TodoItem): void {
    console.log('editing ' + todo);
    if (todo.edit === null) {
      todo.edit = false;
    }
    todo.edit = !todo.edit;
    if (todo.edit) {
      this.tmpCaption = todo.description;
      this.editingInProgress = true;
    } else {
      this.editingInProgress = false;
    }
  }
}
