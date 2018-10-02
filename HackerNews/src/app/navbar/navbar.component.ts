import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent implements OnInit {
  array: Array<any> = [
    {type: 'topstories', name: 'Top'},
    {type: 'newstories', name: 'New'},
    {type: 'showstories', name: 'Show'},
    {type: 'askstories', name: 'Ask'},
    {type: 'jobstories', name: 'Jobs'},
  ];
  constructor() {}
  ngOnInit() {}
}
