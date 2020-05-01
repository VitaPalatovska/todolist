import { Component } from "@angular/core";
import { Lists } from "../interfaces/lists";
import { Todo } from "../interfaces/todo";
import { TodoListService } from "../../services/todo-list.service";

@Component({
  selector: "create-todolist",
  templateUrl: "create-todolist.component.html",
  styleUrls: ["create-todolist.component.scss"]
})
export class CreateTodolist {
  addListTitle: boolean;
  listTitle: string;
  cacheListTitle: string;
  todoTitle: string;
  cacheTodoTitle: string;
  todos: Todo[];
  todoId: number;

  ngOnInit() {
    this.todoTitle = "";
    this.addListTitle = true;
    this.todoId = 1;
    this.todos = this.todoListService.get("todos");
    this.addListTitleValue();
  }

  constructor(private todoListService: TodoListService) {}

  addListTitleValue(): void {
    if (
      this.todoListService.get("title") !== null &&
      this.todoListService.get("title").trim().length > 0
    ) {
      this.addListTitle = false;
      this.listTitle = this.todoListService.get("title");
    } else {
      this.addListTitle = true;
      this.listTitle = "";
    }
  }

  addNewListTitle(): void {
    if (this.listTitle.trim().length === 0) {
      this.listTitle = this.cacheListTitle;
    }

    this.todoListService.set("title", this.listTitle);
    this.addListTitle = false;
  }

  editListTitle(): void {
    this.cacheListTitle = this.listTitle;
    this.addListTitle = true;
  }

  addToDo(): void {
    if (this.todoTitle.trim().length === 0) {
      this.todoTitle = this.cacheTodoTitle;
    }

    this.todos.push({
      id: this.todoId,
      title: this.todoTitle,
      editing: false,
      completed: false
    });

    this.todoListService.set("todos", this.todos);
    this.todoTitle = "";
    this.todoId++;
  }

  deleteToDo(id: number): void {
    this.todos = this.todos.filter(todo => todo.id !== id);
    this.todoListService.set("todos", this.todos);
  }

  editToDo(todo: Todo): void {
    this.cacheTodoTitle = todo.title;
    todo.editing = true;
    this.todoListService.set("todos", this.todos);
  }

  doneEdit(todo: Todo): void {
    if (todo.title.trim().length === 0) {
      todo.title = this.cacheTodoTitle;
    }
    todo.editing = false;
    this.todoListService.set("todos", this.todos);
  }
  cancelEdit(todo: Todo): void {
    todo.title = this.cacheTodoTitle;
    todo.editing = false;
    this.todoListService.set("todos", this.todos);
  }

  remaining(): number {
    return this.todos.filter(todo => !todo.completed).length;
  }

  atLeastOneCompleted(): boolean {
    this.todoListService.set("todos", this.todos);
    return this.todos.filter(todo => todo.completed).length > 0;
  }

  clearCompleted(): void {
    this.todos = this.todos.filter(todo => !todo.completed);
    this.todoListService.set("todos", this.todos);
  }

  saveList(): void {
    this.todos = [];
    this.listTitle = "";
    this.todoListService.set("title", " ");
    this.todoListService.set("todos", "");
  }
}
