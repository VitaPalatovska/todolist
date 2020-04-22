import { Injectable } from "@angular/core";
import { Lists } from "../app/interfaces/lists";
import { Todo } from "../app/interfaces/todo";
import { ListObj } from "../app/interfaces/list";

@Injectable()
export class TodoListService {
  private lists: Lists[] = [];

  title: string;
  todoId: number;

  ngOnInit() {}

  saveList(obj: Lists[]) {
    this.set("lists", obj);
    this.lists = this.get("lists");
  }

  getLocalList(): Lists[] {
    return this.get("lists");
  }

  removeLocalStorageItem(key: string) {
    localStorage.removeItem(key);
  }

  getData(): Lists[] {
    return this.lists;
  }

  set(key: string, data: any): void {
    try {
      localStorage.setItem(key, JSON.stringify(data));
    } catch (e) {
      console.error("Error saving to localStorage", e);
    }
  }

  get(key: string) {
    try {
      return JSON.parse(localStorage.getItem(key));
    } catch (e) {
      console.error("Error getting data from localStorage", e);
      return null;
    }
  }

  getListId() {
    function forEachKey(callback) {
      for (var i = 0; i < localStorage.length; i++) {
        callback(localStorage.key(i));
      }
    }
  }
}
