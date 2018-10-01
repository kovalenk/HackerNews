import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Cacheable} from 'ngx-cacheable';

@Injectable({
  providedIn: 'root'
})

export class GivelistService {
  private collectionSize: any;

  constructor(
    private http: HttpClient
  ) {
  }

  @Cacheable()
  getNews(stories: string) {
    return this.http.get(
      `https://hacker-news.firebaseio.com/v0/${stories}.json?print=pretty`
    );
  }

  @Cacheable()
  getData(StoryId: number): any {
    return this.http.get(
      `https://hacker-news.firebaseio.com/v0/item/${StoryId}.json?print=pretty`
    );
  }

  listViewCreate(type: string, begin: number, end: number) {
    return new Promise(resolve => {
      this.getNews(type).subscribe( (res: any[]) => {
        const requests = res.slice(begin, end)
          .map(id => this.getData(id).toPromise());
        Promise.all(requests).then(items => {
          resolve({
            total: res.length,
            items: items
          });
        });
      });
    });
  }

  secondsConv(num: number) {
    const Now = Math.round(new Date().getTime() / 1000.0);
    const diff = Now - num;
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
