import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-top",
  templateUrl: "./top.component.html",
  styleUrls: ["./top.component.css"]
})
export class TopComponent implements OnInit {
  constructor() {}

  ngOnInit() {}
  // ngOnInit() {
  //   this.data.gimmeJokes().subscribe(res => {
  //     this.str = `https://hacker-news.firebaseio.com/v0/item/${res[3]}.json?print=pretty`;
  //     this.joke = this.http.get(`https://hacker-news.firebaseio.com/v0/topstories.json?print=pretty`);
  //     this.data.getData(this.str).subscribe(rez => {
  //       this.joke = rez;
  //       this.myUrl = ' // ' + rez.url.split('/')[2];
  //       console.log(this.myUrl);
  //       this.time = this.getNormTime(rez.time);
  //     });
  //     // this.joke = res;
  //   });
  // }
  // getNormTime(num: number) {
  //   const Now = Math.round(new Date().getTime() / 1000.0);
  //   const Mydate = new Date(num * 1000);
  //   const diff = Now - num;
  //   if (Math.floor(diff / (3600 * 24)) > 0) {
  //     if (Math.floor(diff / (3600 * 24)) === 1) {
  //       return 'a day ago';
  //     } else {
  //       return Math.floor(diff / (3600 * 24)) + ' days ago';
  //     }
  //   } else {
  //     if (Math.floor(diff / 3600) > 0) {
  //       if (Math.floor(diff / 3600) === 1) {
  //         return 'an hour ago';
  //       } else {
  //         return Math.floor(diff / 3600) + ' hours ago';
  //       }
  //     } else {
  //       if (Math.floor(diff / 60) === 1) {
  //         return 'a minute ago';
  //       } else {
  //         return Math.floor(diff / 60) + ' minutes ago';
  //       }
  //     }
  //   }
  // }
}
