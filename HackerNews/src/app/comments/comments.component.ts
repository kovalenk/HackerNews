import { Component, OnInit } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {GivelistService} from '../givelist.service';
import {ActivatedRoute} from "@angular/router";
import {Subscription} from "rxjs";

import * as $ from 'jquery';

@Component({
  selector: 'app-comments',
  templateUrl: './comments.component.html',
  styleUrls: ['./comments.component.css']
})
export class CommentsComponent implements OnInit {
  private title:string;
  private by:string;
  private time:any;
  private score:number;
  private Comments  = [];
  private querySubscription: Subscription;
  constructor(
    private http: HttpClient,
    private data: GivelistService,
    private route: ActivatedRoute) {
    this.querySubscription = this.route.queryParams.subscribe(
      (queryParam: any) => {
        let id = queryParam['id'];
        this.loadPage(id);
      });
  }

  ngOnInit() {

  }

  loadPage(id: number){
    this.data.GetData(id).subscribe( rez =>{

      this.title = rez.title;
      this.by = rez.by;
      this.time = this.data.SecondsConv(rez.time);
      this.score = rez.score;
      if(rez.descendants == 0 || rez.descendants == undefined )
      {
        $("#CommentContainer").append('<h5> No comments yet :(</h5>');
      }
      else{
        this.getKidsData(rez.kids);
      }
    });
  }

  getKidsData(KidsArr:any){
    for (let i = 0; i < KidsArr.length; i++) {
      this.data.GetData(KidsArr[i]).subscribe(comm => {
        console.log(comm);
        if(comm.kids == undefined){
          if(comm.deleted != true || comm.deleted == undefined){
            comm.time = this.data.SecondsConv(comm.time);
            this.Comments.push(comm);
          }
        }
        else{
          this.getKidsData(comm.kids);
        }
      });
    }
  }

  // loadPage() {
  //   this.data.GetNews('topstories').subscribe(res => {
  //     this.collectionSize = Object.keys(res).length;
  //     let ArrBgn = this.page * this.pageSize;
  //     let ArrEnd = ArrBgn + this.pageSize;
  //     for (ArrBgn; ArrBgn < ArrEnd; ArrBgn++) {
  //       this.data.GetData(res[ArrBgn]).subscribe(rez => {
  //
  //         console.log(rez);
  //         let time = this.data.SecondsConv(rez.time);
  //         let Comments = "";
  //         if (rez.descendants == "discuss" || rez.descendants == "0" || rez.descendants == undefined) {Comments = "discuss";}
  //         else Comments = rez.descendants + " comments";
  //         this.HtmlCode = `<div class="MainTempl">
  //             <div class="col-sm-12 title">
  //               <a href="${rez.url}"><h4 class="">${rez.title}</h4></a>
  //               <hr>
  //             </div>
  //             <div class="row TemplBott">
  //               <div class="justify-content-center col-sm-3 by">
  //                 <h5>By ${rez.by}</h5>
  //               </div>
  //               <div class="col-sm-3 comments col-sm-3 ">
  //               <a _ngcontent-c3 ng-reflect-query-params="[object Object]" ng-reflect-router-link="/comments" href="/comments?id=${rez.id}"><h5>${Comments}</h5></a></div>
  //               <div class="justify-content-center col-sm-3 time">
  //                 <h5>${time}</h5>
  //               </div>
  //               <div class="justify-content-start offset-sm-1 col-sm-2 store row">
  //                 <img src="../../assets/img/_ionicons_svg_md-star.svg" alt="star Icon" height="30" width="30">
  //                 <h5 >${rez.score}</h5>
  //               </div>
  //             </div>
  //           </div>`;
  //         $("#topList").append(this.HtmlCode);
  //       });
  //     }
  //
  //   });
  //   this.HtmlCode = "";
  //
  // }



}
