import { Component, OnInit } from "@angular/core";
import {HttpClient} from '@angular/common/http';
import {GivelistService} from '../givelist.service';
import * as $ from 'jquery';

@Component({
  selector: "app-new",
  templateUrl: "./new.component.html",
  styleUrls: ["./new.component.css"]
})
export class NewComponent implements OnInit {
  public page = 1;
  public collectionSize: number;
  public pageSize = 20;
  public StoryType = "newstories";
  addTempl: any;
  News: any;
  str: any;
  time: any;
  typeStore: any;
  constructor(
    private http: HttpClient,
    private data: GivelistService) {

    this.data.GetNews(this.StoryType).subscribe(res => {
      this.collectionSize = Object.keys(res).length;
    });
  }

  ngOnInit() {
    this.data.GetNews(this.StoryType).subscribe(res => {
      for (let i = 0; i < this.pageSize; i++) {
        this.str = `https://hacker-news.firebaseio.com/v0/item/${
          res[i]
          }.json?print=pretty`;
        this.data.getData(this.str).subscribe(rez => {
          this.News = rez;
          switch (rez.type) {
            case 'story':
              this.typeStore = `<div class="col-sm-1 types" *ngIf="rez.type=='story'">
               <img src="../../assets/img/script.png" height="70" width="70"/>
             </div>`;
              break;
            case 'job':
              this.typeStore = `<div class=" col-sm-1 types" *ngIf="rez.type=='story'">
               <img src="../../assets/img/resume.png" height="70" width="70"/>
             </div>`;
              break;
            case 'comment':
              this.typeStore = `<div class=" col-sm-1 types" *ngIf="rez.type=='story'">
               <img src="../../assets/img/chat.png" height="70" width="70"/>
             </div>`;
              break;
            case 'pollopt':
              this.typeStore = `<div class=" col-sm-1 types" *ngIf="rez.type=='story'">
               <img src="../../assets/img/poll.png" height="70" width="70"/>
             </div>`;
              break;
            case 'poll':
              this.typeStore = `<div class=" col-sm-1 types" *ngIf="rez.type=='story'">
               <img src="../../assets/img/elections.png" height="70" width="70"/>
             </div>`;
              break;
          }
          this.time = this.SecondsConv(rez.time);
          this.addTempl = `<div class="MainTempl">
           <div class="col-sm-12 title">
             <a href="${rez.url}"><h2 class="">${rez.title}</h2></a>
             <hr>
           </div>
           <div class="row TemplCenter">
             <div class="align-items-center offset-sm-10  col-sm-1 store row">
               <img src="../../assets/img/_ionicons_svg_md-star.svg" alt="star Icon" height="30" width="30">
               <h5 >${rez.score}</h5>
             </div>
             ${this.typeStore}
           </div>
           <div class="row TemplBott">
             <div class="col-sm-2 by">
               <h5 >By ${rez.by}</h5>
             </div>
             <div class="col-sm-2 comments">
               <h5>${rez.descendants} comments</h5>
             </div>
             <div class=" col-sm-2 time">
               <h5  *ngIf="time">${this.time}</h5>
             </div>
           </div>
         </div>`;
          $('#topList').append(this.addTempl);
        });
      }

    });
  }

  SecondsConv(num: number) {
    const Now = Math.round(new Date().getTime() / 1000.0);
    const Mydate = new Date(num * 1000);
    const diff = Now - num;
    if (Math.floor(diff / (3600 * 24)) > 0) {
      if (Math.floor(diff / (3600 * 24)) === 1) {
        return 'a day ago';
      } else {
        return Math.floor(diff / (3600 * 24)) + ' days ago';
      }
    } else {
      if (Math.floor(diff / 3600) > 0) {
        if (Math.floor(diff / 3600) === 1) {
          return 'an hour ago';
        } else {
          return Math.floor(diff / 3600) + ' hours ago';
        }
      } else {
        if (Math.floor(diff / 60) === 1) {
          return 'a minute ago';
        } else {
          return Math.floor(diff / 60) + ' minutes ago';
        }
      }
    }
  }
}
