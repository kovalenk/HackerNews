import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { TopComponent } from './top/top.component';
import { NewComponent } from './new/new.component';
import { ShowComponent } from './show/show.component';
import { AskComponent } from './ask/ask.component';
import { JobsComponent } from './jobs/jobs.component';
import {CommentsComponent} from "./comments/comments.component";

const routes: Routes = [
  { path: '', redirectTo: '/top', pathMatch: 'full' },
  { path: 'top', component: TopComponent },
  { path: 'new', component: NewComponent },
  { path: 'show', component: ShowComponent },
  { path: 'ask', component: AskComponent },
  { path: 'jobs', component: JobsComponent },
  { path: 'comments', component: CommentsComponent },

];

@NgModule({
  imports: [RouterModule.forRoot(routes), CommonModule],
  exports: [RouterModule],
  declarations: []
})
export class AppRoutingModule {}
