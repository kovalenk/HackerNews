import {Component, OnInit} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {GivelistService} from '../givelist.service';
import * as $ from 'jquery';

@Component({
  selector: "app-show",
  templateUrl: "./show.component.html",
  styleUrls: ["./show.component.css"]
})
export class ShowComponent implements OnInit {
  page: number = 1;
  collectionSize: number;
  pageSize = 10;
  private HtmlCode:any;
  constructor(
    private http: HttpClient,
    private data: GivelistService) {
  }
  change() {
    document.getElementById("ShowList").innerHTML = "";
    this.loadPage();
  }

  ngOnInit() {
    this.loadPage();
  }
  loadPage() {
    this.data.GetNews('showstories').subscribe(res => {
      this.collectionSize = Object.keys(res).length;
      let ArrBgn = this.page * this.pageSize;
      let ArrEnd = ArrBgn + this.pageSize;
      for (ArrBgn; ArrBgn < ArrEnd; ArrBgn++) {
        this.data.GetData(res[ArrBgn]).subscribe(rez => {
          let time = this.data.SecondsConv(rez.time);
          let Comments = "";
          if (rez.descendants == "discuss" || rez.descendants == "0" || rez.descendants == undefined) {Comments = "discuss";}
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
                <div class="col-sm-3 comments col-sm-3 ">
                <a _ngcontent-c3 ng-reflect-query-params="[object Object]" ng-reflect-router-link="/comments" href="/comments?id=${rez.id}"><h5>${Comments}</h5></a></div>
                <div class="justify-content-center col-sm-3 time">
                  <h5>${time}</h5>
                </div>
                <div class="justify-content-start offset-sm-1 col-sm-2 store row">
                  <img src="../../assets/img/_ionicons_svg_md-star.svg" alt="star Icon" height="30" width="30">
                  <h5 >${rez.score}</h5>
                </div>
              </div>
            </div>`;
          $("#ShowList").append(this.HtmlCode);
        });
      }
    });
    this.HtmlCode = "";
  }
}
