import { Component, Input } from "@angular/core";

@Component({
  selector: "added-list",
  templateUrl: "added-lists.component.html",
  styleUrls: ["added-lists.component.scss"]
})
export class AddedLists {
  @Input() title: string;
  @Input() todosCount: number;
}
