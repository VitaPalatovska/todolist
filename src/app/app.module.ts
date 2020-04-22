import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { FormsModule } from "@angular/forms/";
import { AutofocusFixModule } from "ngx-autofocus-fix";
import { List } from "./lists/lists.component";
import { NgxWebstorageModule } from "ngx-webstorage";
import { SESSION_STORAGE } from "ngx-webstorage-service";

@NgModule({
  declarations: [AppComponent, List],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    AutofocusFixModule.forRoot(),
    NgxWebstorageModule.forRoot()
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
