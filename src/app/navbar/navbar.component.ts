import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent implements OnInit {
  MenuItems: Array<any> = [
    {storyType: 'topstories', PageName: 'Top'},
    {storyType: 'newstories', PageName: 'New'},
    {storyType: 'showstories', PageName: 'Show'},
    {storyType: 'askstories', PageName: 'Ask'},
    {storyType: 'jobstories', PageName: 'Jobs'},
  ];
  constructor() {}
  ngOnInit() {}
}
