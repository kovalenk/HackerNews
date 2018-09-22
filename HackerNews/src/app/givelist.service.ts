import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class GivelistService {
  constructor(
    private http: HttpClient
    ) {}

  GetNews(stories : string) {
    return this.http.get(
      `https://hacker-news.firebaseio.com/v0/${stories}.json?print=pretty`
    );
  }

  GetData(StoryId : number):any {
    return this.http.get(
      `https://hacker-news.firebaseio.com/v0/item/${StoryId}.json?print=pretty`
    );
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
