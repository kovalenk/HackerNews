import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Cacheable} from 'ngx-cacheable';

@Injectable({
  providedIn: 'root',
})
export class GivelistService {
  constructor(private http: HttpClient) {}

  @Cacheable()
  getNews(stories: string) {
    return this.http.get(
      `https://hacker-news.firebaseio.com/v0/${stories}.json?print=pretty` // get arr from API
    );
  }
  getData(StoryId: number):any {
    return new Promise(resolve => {
      this.http
        .get(
          `https://hacker-news.firebaseio.com/v0/item/${StoryId}.json?print=pretty` // get item information list
        )
        .subscribe(data => {
          resolve(data);
        });
    });
  }
  listViewCreate(type: string, begin: number, end: number) {
    return new Promise(resolve => {
      // make new Promise
      this.getNews(type).subscribe((res: any[]) => {
        // get all stories id list
        const requests = res
          .slice(begin, end) // returns a new array containing N number of elements
          .map(id =>
            this.http
              .get(
                // returns a new array containing every id description
                `https://hacker-news.firebaseio.com/v0/item/${id}.json?print=pretty`
              )
              .toPromise()
          );
        Promise.all(requests).then(items => {
          // waiting for 'requests' generation
          resolve({
            total: res.length, // return all stories length
            items: items, // return information array
          });
        });
      });
    });
  }

  secondsConverter(num: any) {
    return new Promise(resolve => {
      const isNumver = /^[0-9]+$/;
      if (isNumver.test(num)) {
        // converter to days/ hours / minutes
        const Now = Math.round(new Date().getTime() / 1000.0);
        const diff = Now - num;
        if (Math.floor(diff / (3600 * 24)) > 0) {
          if (Math.floor(diff / (3600 * 24)) === 1) {
            resolve('a day ago');
          } else {
            resolve(Math.floor(diff / (3600 * 24)) + ' days ago');
          }
        } else {
          if (Math.floor(diff / 3600) > 0) {
            if (Math.floor(diff / 3600) === 1) {
              resolve('an hour ago');
            } else {
              resolve(Math.floor(diff / 3600) + ' hours ago');
            }
          } else {
            if (Math.floor(diff / 60) === 1) {
              resolve('a minute ago');
            } else {
              resolve(Math.floor(diff / 60) + ' minutes ago');
            }
          }
        }
      } else {
        resolve(num);
      }
    });
  }
}
