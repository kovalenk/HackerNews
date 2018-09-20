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
  getData(str: string): any {
    return this.http.get(str);
  }

}
