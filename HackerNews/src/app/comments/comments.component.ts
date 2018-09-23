import { Component, OnInit } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {GivelistService} from '../givelist.service';
import {ActivatedRoute} from '@angular/router';
import {Subscription} from 'rxjs';

import * as $ from 'jquery';

@Component({
  selector: 'app-comments',
  templateUrl: './comments.component.html',
  styleUrls: ['./comments.component.css']
})
export class CommentsComponent implements OnInit {
  private title: string;
  private by: string;
  private time: any;
  private score: number;
  private Comments  = [];
  private querySubscription: Subscription;
  constructor(
    private http: HttpClient,
    private data: GivelistService,
    private route: ActivatedRoute) {
    this.querySubscription = this.route.queryParams.subscribe(
      (queryParam: any) => {
        const id = queryParam['id'];
        this.loadPage(id);
      });
  }

  ngOnInit() {

  }

  loadPage(id: number) {
    this.data.GetData(id).subscribe( rez => {

      this.title = rez.title;
      this.by = rez.by;
      this.time = this.data.SecondsConv(rez.time);
      this.score = rez.score;
      if (rez.descendants == 0 || rez.descendants == undefined ) {
        $('#CommentContainer').append('<h5> No comments yet :(</h5>');
      } else {
        this.getKidsData(rez.kids);
      }
    });
  }

  getKidsData(KidsArr: any) {
    for (let i = 0; i < KidsArr.length; i++) {
      this.data.GetData(KidsArr[i]).subscribe(comm => {
        console.log(comm);
        if (comm.kids == undefined) {
          if (comm.deleted != true || comm.deleted == undefined) {
            comm.time = this.data.SecondsConv(comm.time);
            this.Comments.push(comm);
          }
        } else {
          this.getKidsData(comm.kids);
        }
      });
    }
  }



}