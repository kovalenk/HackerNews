import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { TopComponent } from './top/top.component';
import { NewComponent } from './new/new.component';
import { ShowComponent } from './show/show.component';
import { AskComponent } from './ask/ask.component';
import { JobsComponent } from './jobs/jobs.component';
import {CommentsComponent} from './comments/comments.component';
import {PaginationComponent} from './pagination/pagination.component';

const routes: Routes = [
  { path: '', redirectTo: '/topstories/1', pathMatch: 'full' },
  { path: ':name/:page', component: PaginationComponent},
  { path: 'topstories', component: TopComponent },
  { path: 'newstories', component: NewComponent },
  { path: 'showstories', component: ShowComponent },
  { path: 'askstories', component: AskComponent },
  { path: 'jobstories', component: JobsComponent },
  { path: 'comments', component: CommentsComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes), CommonModule],
  exports: [RouterModule],
  declarations: []
})
export class AppRoutingModule {}
