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
  ) {
  }

  ngOnInit() {
    this.querySubscription = this.route.queryParams.subscribe(
      async queryParam => {
        const id = queryParam['id'];
        await this.loadPage(id);
      }
    );
  }

  async loadPage(id: number) {
    await this.data.getData(id).then(async rez => {
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
        await this.getKidsData(rez.kids);
      }
    });
  }

  async getKidsData(KidsArray: any) {
    const length = KidsArray.length - 1;
    KidsArray.map(async (val, i) => {
      this.data.getData(val).then(comments => {
        if (comments !== null) {
          if (comments.deleted === undefined) {
            this.data.secondsConverter(comments.time).then(convert => {
              comments.time = convert;
            });
            if (comments.kids === undefined) {
              this.Comments.add(comments);
              KidsArray.shift(comments.id);
            } else {
              this.Comments.add(comments);
              comments.kids.forEach(function(value) {
                KidsArray.push(value);
              });
              KidsArray.shift(comments.id);
            }
          } else {
            KidsArray.shift();
          }
          if (i === length && i !== -1) {
            this.getKidsData(KidsArray);
          }
        }
      });
    });
  }

  ngOnDestroy() {
    this.querySubscription.unsubscribe();
  }
}
