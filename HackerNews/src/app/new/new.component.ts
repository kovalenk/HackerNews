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
          let time = this.data.SecondsConv(rez.time);
          let Comments = "";
          if (rez.descendants == "discuss" || rez.descendants == "0" || rez.descendants == undefined) {Comments = "discuss";}
          else Comments = rez.descendants + " comments";
          this.HtmlCode = `<div class="MainTempl">
              <div class="col-sm-12 title">
                <a href="${rez.url}"><h4 class="">${rez.title}</h4></a>
                <hr>
              </div>
              <div class="row TemplBott align-items-center">
                <div class="col-sm-6 row">
                  <h6 style="padding-left: 15px;"> By <span style="color: #595959; ">${rez.by}</span></h6> <h6 style="font-weight: 700; padding: 0px 5px;">| </h6>    <a _ngcontent-c3 ng-reflect-query-params="[object Object]" ng-reflect-router-link="/comments" href="/comments?id=${rez.id}" class="comments"><h6>${Comments}</h6></a>
                </div>
                <div class="justify-content-center col-sm-4 time text-sm-right">
                  <h5>${time}</h5>
                </div>
                <div class="store row">
                  <img src="../../assets/img/_ionicons_svg_md-star.svg" alt="star Icon">
                  <h4 >${rez.score}</h4>
                </div>
              </div>
            </div>`;
          $("#NewsList").append(this.HtmlCode);
        });
      }
    });
    this.HtmlCode = "";
  }
}
