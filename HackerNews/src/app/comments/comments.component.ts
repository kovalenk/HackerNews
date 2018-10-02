import {Component, OnInit} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {GivelistService} from '../givelist.service';
import {ActivatedRoute} from '@angular/router';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-comments',
  templateUrl: './comments.component.html',
  styleUrls: ['./comments.component.css'],
})
export class CommentsComponent implements OnInit {
  public title: string;
  public by: string;
  public time: any;
  public score: number;
  public CommentsStatus : boolean;
  public Comments = [];
  public querySubscription: Subscription;
  constructor(
    private http: HttpClient,
    private data: GivelistService,
    private route: ActivatedRoute
  ) {
    this.querySubscription = this.route.queryParams.subscribe(
      (queryParam: any) => {
        const id = queryParam['id'];
        this.loadPage(id);
      }
    );
  }

  ngOnInit() {}

  loadPage(id: number) {
    this.data.getData(id).subscribe(rez => {
      this.title = rez.title;
      this.by = rez.by;
      this.time = this.data.secondsConverter(rez.time);
      this.score = rez.score;
      if (rez.descendants === 0 || rez.descendants === undefined) {
        this.CommentsStatus = false;
      }
      else
      {
        this.CommentsStatus = true;
        this.getKidsData(rez.kids);
      }
    });
  }

  getKidsData(KidsArr: any) {
    for (let i = 0; i < KidsArr.length; i++) {
      this.data.getData(KidsArr[i]).subscribe(comm => {
        if (comm.kids === undefined) {
          if (comm.deleted !== true || comm.deleted === undefined) {
            comm.time = this.data.secondsConverter(comm.time);
            this.Comments.push(comm);
          }
        } else {
          this.getKidsData(comm.kids);
        }
      });
    }
  }
}
