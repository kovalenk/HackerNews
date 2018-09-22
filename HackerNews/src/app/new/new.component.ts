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
  page: number = 1;
  collectionSize: number;
  pageSize = 10;
  private HtmlCode:any;
  constructor(
    private http: HttpClient,
    private data: GivelistService) {
  }
  change() {
    document.getElementById("NewsList").innerHTML = "";
    this.loadPage();
  }
  ngOnInit() {
    this.loadPage();
  }

  loadPage() {
    this.data.GetNews('newstories').subscribe(res => {
      this.collectionSize = Object.keys(res).length;
      let ArrBgn = this.page * this.pageSize;
      let ArrEnd = ArrBgn + this.pageSize;
      for (ArrBgn; ArrBgn < ArrEnd; ArrBgn++) {
        this.data.GetData(res[ArrBgn]).subscribe(rez => {
          console.log(rez);

          let time = this.SecondsConv(rez.time);
          let Comments = "";
          if (rez.descendants == "discuss") {Comments = "discuss";}
          else Comments = rez.descendants + " comments";
          this.HtmlCode = `<div class="MainTempl">
              <div class="col-sm-12 title">
                <a href="${rez.url}"><h4 class="">${rez.title}</h4></a>
                <hr>
              </div>
              <div class="row TemplBott">
                <div class="justify-content-center col-sm-3 by">
                  <h5>By ${rez.by}</h5>
                </div>
                <div class="col-sm-3 comments"><h5>${Comments}</h5></div>
                <div class="justify-content-center col-sm-3 time">
                  <h5>${time}</h5>
                </div>
                <div class="justify-content-start offset-sm-1 col-sm-2 store row">
                  <img src="../../assets/img/_ionicons_svg_md-star.svg" alt="star Icon" height="30" width="30">
                  <h5 >${rez.score}</h5>
                </div>
              </div>
            </div>`;
          $("#NewsList").append(this.HtmlCode);
        });
      }

    });
    this.HtmlCode = "";

  }

  SecondsConv(num: number) {
    let Now = Math.round(new Date().getTime() / 1000.0);
    let diff = Now - num;
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
