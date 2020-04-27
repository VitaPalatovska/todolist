import { Component } from "@angular/core";
import { Lists } from "../interfaces/lists";
import { ListObj } from "../interfaces/list";
import { Todo } from "../interfaces/todo";
import { TodoListService } from "../../services/todo-list.service";
import { ReturnStatement } from "@angular/compiler";

@Component({
  selector: "list",
  templateUrl: "list.component.html",
  styleUrls: ["list.component.scss"],
  providers: [TodoListService]
})
export class List {
  localListTitle: string;
  todoTitle: string;
  localTodos: object[];
  beforeEditCache: string;
  lists: Lists[];
  list: ListObj;
  listId: number;
  todoId: number;
  addList: boolean;
  addTodos: boolean = false;
  showLists: boolean;

  listTitle: string;

  constructor(private todoListService: TodoListService) {}

  ngOnInit() {
    this.beforeEditCache = "";
    this.todoTitle = "";
    this.listTitle = "";
    this.lists = [];
    this.list = {
      id: 1,
      title: "",
      todos: []
    };

    this.setTodoId();
    this.showListTitle();
    this.showLocalTodos();
    this.showCreatedLists();
    this.getLists();
  }

  setTodoId(): number {
    if (this.todoListService.get("todos") !== null) {
      this.todoId = this.todoListService.get("todos").length - 1;
      this.todoId = this.todoListService.get("todos")[this.todoId].id;
      return this.todoId++;
    } else {
      return (this.todoId = 1);
    }
  }

  setListId(): number {
    if (this.todoListService.get("lists") !== null) {
      this.listId = this.todoListService.get("lists").length - 1;
      this.listId = this.todoListService.get("lists")[this.listId].id;
      return this.listId++;
    } else {
      return (this.listId = 1);
    }
  }

  addNewListTitle(): void {
    this.addTodos = true;
    if (this.listTitle.trim().length === 0) {
      this.listTitle = this.beforeEditCache;
    }
    this.list.title = this.listTitle;
    this.todoListService.set("title", this.listTitle);
    this.addList = false;
  }

  editListTitle() {
    this.beforeEditCache = this.listTitle;
    this.addList = true;
  }

  showListTitle(): string {
    this.localListTitle = this.todoListService.get("title");

    if (this.localListTitle !== null) {
      if (this.localListTitle.trim().length > 0) {
        this.addList = false;
        this.addTodos = true;
      } else {
        this.addList = true;
      }
    } else {
      this.addList = true;
      this.localListTitle = this.list.title;
    }

    return this.localListTitle;
  }

  addToDo(): void {
    if (this.todoTitle.trim().length === 0) {
      return;
    }

    this.list.todos.push({
      id: this.todoId,
      title: this.todoTitle,
      completed: false,
      editing: false
    });

    this.todoListService.set("todos", this.list.todos);
    this.todoTitle = "";
    this.todoId++;
  }

  showLocalTodos(): void {
    if (this.todoListService.get("todos") !== null) {
      this.list.todos = this.todoListService.get("todos");
    } else {
      return;
    }
  }

  getLocalLists(): Lists[] {
    if (this.todoListService.get("lists") !== null) {
      return this.todoListService.get("lists");
    } else {
      return [];
    }
  }

  deleteToDo(id: number): void {
    this.list.todos = this.list.todos.filter(todo => todo.id !== id);
    this.todoListService.set("todos", this.list.todos);
  }

  editToDo(todo: Todo): void {
    this.beforeEditCache = todo.title;
    todo.editing = true;
    this.todoListService.set("todos", this.list.todos);
  }

  doneEdit(todo: Todo): void {
    if (todo.title.trim().length === 0) {
      todo.title = this.beforeEditCache;
    }
    todo.editing = false;
    this.todoListService.set("todos", this.list.todos);
  }
  cancelEdit(todo: Todo): void {
    todo.title = this.beforeEditCache;
    todo.editing = false;
    this.todoListService.set("todos", this.list.todos);
  }

  remaining(): number {
    return this.list.todos.filter(todo => !todo.completed).length;
  }

  atLeastOneCompleted(): boolean {
    this.todoListService.set("todos", this.list.todos);
    return this.list.todos.filter(todo => todo.completed).length > 0;
  }

  clearCompleted(): void {
    this.list.todos = this.list.todos.filter(todo => !todo.completed);
    this.todoListService.set("todos", this.list.todos);
  }

  saveList(): void {
    if (this.localListTitle.trim().length === 0) {
      return;
    }
    this.lists.push({
      id: this.listId,
      title: this.localListTitle,
      todos: this.list.todos
    });
    this.todoListService.saveList(this.lists);
    this.todoListService.removeLocalStorageItem("title");
    this.todoListService.removeLocalStorageItem("todos");
    this.todoId = 1;
    this.todoTitle = "";
    this.listTitle = "";
    this.list.todos = [];
    this.addList = true;
    this.addTodos = false;
    this.localListTitle = "";
  }

  getLists(): void {
    if (
      this.todoListService.get("lists") !== null &&
      this.todoListService.get("lists").length > 0
    ) {
      this.lists = this.todoListService.get("lists");
    } else {
      this.lists = [];
    }
  }

  showCreatedLists(): boolean {
    if (
      this.todoListService.get("lists") !== null &&
      this.todoListService.get("lists").length > 0
    ) {
      return true;
    } else {
      return false;
    }
  }
}
