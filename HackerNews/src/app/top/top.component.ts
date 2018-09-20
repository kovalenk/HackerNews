import {Component, OnInit} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {GivelistService} from '../givelist.service';
import { ActivatedRoute} from '@angular/router';
import * as $ from 'jquery';
import {Subscription} from 'rxjs';
@Component({
  selector: 'app-top',
  templateUrl: './top.component.html',
  styleUrls: ['./top.component.css']
})
export class TopComponent implements OnInit {
  public page: number;
  public collectionSize: number;
  public ArrBgn: number;
  public ArrEnd: number;
  public pageSize = 20;
  public StoryType = 'topstories';
  News: any;
  str: any;
  time: any;
  // typeStore: any;
   private  id: any;
  private DataArr = [];
  private routeSubscription: Subscription;
  private querySubscription: Subscription;
  constructor( private http: HttpClient,    private data: GivelistService,  private route: ActivatedRoute) {
    this.page = 1;
    this.loadPage();
  }
  onPageChanged() {
    //document.getElementById("topList").innerHTML = "";
    console.log(this.page);
    this.loadPage();
  }
  ngOnInit() {

  }
  private loadPage() {
    this.data.GetNews(this.StoryType).subscribe(res => {
      this.collectionSize = Object.keys(res).length;
       // this.routeSubscription = this.route.params.subscribe(params => this.id = params['id']);
       // this.querySubscription = this.route.queryParams.subscribe(
       //   (queryParam: any) => {
       //     this.page = queryParam['page'];

          this.ArrBgn = this.page * this.pageSize;
          this.ArrEnd = this.ArrBgn + this.pageSize;

         // }
       // );

      for (this.ArrBgn; this.ArrBgn < this.ArrEnd; this.ArrBgn++) {
        this.str = `https://hacker-news.firebaseio.com/v0/item/${
          res[this.ArrBgn]
          }.json?print=pretty`;
        this.data.getData(this.str).subscribe(rez => {
          this.DataArr.push(rez);
          this.News = rez;
          this.time = this.SecondsConv(rez.time);
        });
      }

    });
    this.page = this.page +1;
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
