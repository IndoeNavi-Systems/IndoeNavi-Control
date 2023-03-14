import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent {
  constructor(private router: Router) {}

  menuItems : any[] = [
    { name: "Statistik", url: "/statistic", isSelected: false },
    { name: "SPE'er", url: "/spes",isSelected: false },
    { name: "Ruter", url: "/routes",isSelected: false },
    { name: "Kort indstillinger", url: "/map-settings",isSelected: false },
  ];

  ngOnInit(): void {
    for (let menuItem of this.menuItems){
    console.log(this.router.url + " = " + menuItem.url);
      if (menuItem.url == this.router.url){
        menuItem.isSelected = true;
      }
    }
  }
}
