import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { AppComponent } from "./app.component";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { AppNavComponent } from "./app-nav/app-nav.component";
import { LayoutModule } from "@angular/cdk/layout";
import { TopComponent } from "./top/top.component";
import { AppRoutingModule } from "./app-routing.module";
import { NewComponent } from "./new/new.component";
import { ShowComponent } from "./show/show.component";
import { AskComponent } from "./ask/ask.component";
import { JobsComponent } from "./jobs/jobs.component";
import { HttpClientModule } from "@angular/common/http";
import { HttpClientInMemoryWebApiModule } from "angular-in-memory-web-api";
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { PaginationComponent } from "./pagination/pagination.component";
@NgModule({
  declarations: [
    AppComponent,
    AppNavComponent,
    TopComponent,
    NewComponent,
    ShowComponent,
    AskComponent,
    JobsComponent,
    PaginationComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    BrowserAnimationsModule,
    LayoutModule,
    AppRoutingModule,
    HttpClientInMemoryWebApiModule,
    NgbModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
