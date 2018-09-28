import { Component, OnInit } from '@angular/core';
import {GivelistService} from "../givelist.service";
import {Router} from "@angular/router";
import {ActivatedRoute} from "@angular/router";
import {HttpClient} from "@angular/common/http";

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.css']
})
export class PaginationComponent implements OnInit {
  page : any;
  collectionSize: any;
  pageSize = 10;
  public ArrList = [];
  public str :any;
  constructor(
    private http: HttpClient,
    private data: GivelistService,
    private router: Router,
    private route: ActivatedRoute) {
  }
  change() {
    this.router.navigate(['/'+this.str+'/'+this.page]);
    this.loadPage();

  }

  ngOnInit() {
    this.route.url.subscribe( res => {this.str = res[0].path; this.page = res[1].path;});
    this.data.getNews(this.str).subscribe(res => {
      this.collectionSize = Object.keys(res).length;
      console.log(this.collectionSize);

    });
    this.loadPage();
  }
  loadPage() {
    this.collectionSize = 350;
    const ArrBgn = (this.page-1) * this.pageSize;
    const ArrEnd = ArrBgn + this.pageSize;
    console.log(this.str, this.page);
    console.log(ArrBgn, ArrEnd);

    this.ArrList = this.data.listViewCreate(this.str, ArrBgn, ArrEnd );
  }
}
