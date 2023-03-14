import { Component, OnInit  } from '@angular/core';
import { Location } from '@angular/common';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {
  constructor(private location: Location) {}

  menuItems : any[] = [
    { name: "Statistik", url: "/statistic", isSelected: false },
    { name: "SPE'er", url: "/spes",isSelected: false },
    { name: "Ruter", url: "/routes",isSelected: false },
    { name: "Kort indstillinger", url: "/map-settings",isSelected: false },
    { name: "Vælg anden lokation", url: "/locations",isSelected: false },
    { name: "Log ud", url: "/login",isSelected: false },
  ];

  ngOnInit(): void {
    for (let menuItem of this.menuItems){
      if (menuItem.url == this.location.path()){
        menuItem.isSelected = true;
      }
    }
  }
}
