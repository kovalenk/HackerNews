import {Component, OnInit} from '@angular/core';
import {GivelistService} from '../givelist.service';
import {Router} from '@angular/router';
import {ActivatedRoute} from '@angular/router';
import {HttpClient} from '@angular/common/http';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.css'],
})
export class PaginationComponent implements OnInit {
  pageSize = 10;
  page: any;
  collectionSize = 500;
  public ArrList = [];
  public str: any;
  public innerWidth: any;
  constructor(
    private http: HttpClient,
    private service: GivelistService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  change() {
    this.router.navigate(['/' + this.str + '/' + this.page]);
    this.loadPage();
  }

  ngOnInit() {
    this.route.url.subscribe(res => {
      this.str = res[0].path;
      this.page = res[1].path;
    });
    this.loadPage();
    this.innerWidth = window.innerWidth;
  }

  loadPage() {
    const ArrBgn = (this.page - 1) * this.pageSize;
    const ArrEnd = ArrBgn + this.pageSize;
    this.service.listViewCreate(this.str, ArrBgn, ArrEnd).then(data => {
      this.collectionSize = Object.values(data)[0];
      this.ArrList = Object.values(data)[1];
      this.ArrList.map(val => {
        if (!/^[0-9]+$/.test(val.time) === false) {
          val.time = this.service.secondsConverter(val.time);
        }
      });
    });
  }
}
