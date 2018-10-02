import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule, Routes} from '@angular/router';
import {CommentsComponent} from './comments/comments.component';
import {PaginationComponent} from './pagination/pagination.component';

const routes: Routes = [
  {path: '', redirectTo: '/topstories/1', pathMatch: 'full'},
  {path: ':name/:page', component: PaginationComponent},
  {path: 'comments', component: CommentsComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes), CommonModule],
  exports: [RouterModule],
  declarations: [],
})
export class AppRoutingModule {}
