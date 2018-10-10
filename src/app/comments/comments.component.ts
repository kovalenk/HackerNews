import {Component, OnDestroy, OnInit} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {GivelistService} from '../givelist.service';
import {ActivatedRoute} from '@angular/router';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-comments',
  templateUrl: './comments.component.html',
  styleUrls: ['./comments.component.css'],
})
export class CommentsComponent implements OnInit, OnDestroy {
  public title: string;
  public by: string;
  public time: any;
  public score: number;
  public CommentsStatus: boolean;
  public Comments = new Set();
  public text: string;
  public querySubscription: Subscription;

  constructor(
    private http: HttpClient,
    private data: GivelistService,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.querySubscription = this.route.queryParams.subscribe(queryParam => {
      const id = queryParam['id'];
      this.loadPage(id);
    });
  }

  loadPage(id: number) {
    this.data.getData(id).then(rez => {
      this.title = rez.title;
      this.by = rez.by;
      this.data.secondsConverter(rez.time).then(convert => {
        this.time = convert;
      });
      this.score = rez.score;
      this.text = rez.text;
      if (rez.descendants === 0 || rez.descendants === undefined) {
        this.CommentsStatus = false;
      } else {
        this.CommentsStatus = true;
        this.getKidsData(rez.kids);
      }
    });
  }

  getDataFromId(id: any) {
    return this.http.get(
      `https://hacker-news.firebaseio.com/v0/item/${id}.json?print=pretty`
    );
  }

  kidsFilter(data: any) {
    if (data !== null) {
      if (data.deleted === undefined) {
        this.data.secondsConverter(data.time).then(convert => {
          data.time = convert;
        });
        this.Comments.add(data);
        if (data.kids !== undefined) {
          return data.kids;
        } else {
          return [];
        }
      } else {
        return [];
      }
    }
  }

  getKidsData(KidsArray: any) {
    if (KidsArray.length !== 0) {
      let fullKids = [];
      const kidsArr = KidsArray.map(async id => {
        const info = await this.getDataFromId(id).toPromise();
        const kids = await this.kidsFilter(info);
        fullKids = [...fullKids, ...kids];
      });
      Promise.all(kidsArr).then(result => {
        this.getKidsData(fullKids);
      });
    }
  }

  ngOnDestroy() {
    this.querySubscription.unsubscribe();
  }
}
