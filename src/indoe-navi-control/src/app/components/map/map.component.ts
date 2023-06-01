import { Component, AfterViewInit } from '@angular/core';
import { IndoeNaviMap } from '../../map/indoe-navi-map';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements AfterViewInit {
  map : IndoeNaviMap | null = null;

  constructor() { }

  ngAfterViewInit(): void {
    this.map = new IndoeNaviMap(<HTMLCanvasElement>document.getElementById("mapCanvas"));
    this.map.initialize();
  }
}
