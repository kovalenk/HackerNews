import {Component, OnInit} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {GivelistService} from '../givelist.service';
import {Router} from "@angular/router";

@Component({
  selector: 'app-top',
  templateUrl: './top.component.html',
  styleUrls: ['./top.component.css']
})
export class TopComponent implements OnInit {
  page = 1;
  collectionSize: number;
  pageSize = 10;
  public ArrList = [];

  constructor(
    private http: HttpClient,
    private data: GivelistService,
    private router: Router) {
  }
  change() {
    this.router.navigate(['/topstories/'+this.page]);
    this.loadPage();
  }

  ngOnInit() {
    this.loadPage();
    this.data.getNews('topstories').subscribe(res => {
      this.collectionSize = Object.keys(res).length;
    });
  }
  loadPage() {
      const ArrBgn = (this.page-1)* this.pageSize;
      const ArrEnd = ArrBgn + this.pageSize;
      this.ArrList = this.data.listViewCreate('topstories', ArrBgn, ArrEnd );
  }
}
