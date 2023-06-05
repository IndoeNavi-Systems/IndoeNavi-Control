import { Component, OnInit  } from '@angular/core';
import { Location } from '@angular/common';
import { IndoeNaviAPIService } from 'src/app/services/indoe-navi-api.service';
import { IndoorMap } from 'src/app/models/indoor-map';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {
  constructor(private location: Location) {}


  menuItems : any[] = [
    { name: "Statistik", url: "/statistic", isSelected: false, iconName:"fa-solid fa-chart-simple" },
    { name: "SPE'er", url: "/spes",isSelected: false, iconName:"fa-solid fa-satellite-dish" },
    { name: "Ruter", url: "/routes",isSelected: false, iconName:"fa-solid fa-route" },
    { name: "Kort indstillinger", url: "/map-settings",isSelected: false, iconName:"fa-solid fa-map" },
    { name: "Vælg anden lokation", url: "/locations",isSelected: false, iconName:"fa-solid fa-location-pin" },
    { name: "Log ud", url: "/login",isSelected: false, iconName:"fa-solid fa-right-from-bracket" },
  ];

  ngOnInit(): void {
    for (let menuItem of this.menuItems){
      if (menuItem.url == this.location.path()){
        menuItem.isSelected = true;
      }
    }
  }
}
