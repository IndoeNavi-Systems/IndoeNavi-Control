import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  constructor(private location : Location) {}
  title = 'indoe-navi-control';
  hideMenu = false;

  ngOnInit(): void {
    this.hideMenu = this.location.path() == "/login" || this.location.path() == "/locations";
  }
}
