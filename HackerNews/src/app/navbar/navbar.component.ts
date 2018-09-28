import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit{
public type :any;
isEnabled : boolean = false;
  constructor(private route: ActivatedRoute,private router : Router) {

  }
  active(str: any){
    const r = document.getElementsByClassName('Active');
    r[0].classList.add('Deflt');
    r[0].classList.remove('Active');
    str.path[0].classList.add('Active');
    str.path[0].classList.remove('Deflt');

  }
  ngOnInit() {
       this.type = window.location.href.split('/')[3];
      // console.log(this.type);
  }
}
