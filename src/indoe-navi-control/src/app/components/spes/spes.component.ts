import { Component } from '@angular/core';
import { IndoeNaviMap } from 'src/app/map/indoe-navi-map';
import { IndoorMap } from 'src/app/models/indoor-map';
import { SPE } from 'src/app/models/spe';
import { IndoeNaviAPIService } from 'src/app/services/indoe-navi-api.service';

@Component({
  selector: 'app-spes',
  templateUrl: './spes.component.html',
  styleUrls: ['./spes.component.css']
})
export class SpesComponent {
  public map : IndoeNaviMap | null = null;
  public indoorMap : IndoorMap = new IndoorMap("", "", "", [], []);

  constructor(public indoeNaviAPIService : IndoeNaviAPIService){}

  ngAfterViewInit() {
    let self = this;
    let mapCanvas = <HTMLCanvasElement>document.getElementById("mapCanvas");

    this.indoeNaviAPIService.getMap().subscribe((indoorMap: IndoorMap) => {
      let mapImage : any = document.getElementById("mapImage");
      mapImage.src = "data:image/png;base64," + indoorMap.imageData;
      
      self.indoorMap = new IndoorMap(indoorMap.id, indoorMap.area, indoorMap.imageData, indoorMap.routeNodes, indoorMap.spes);
      self.map = new IndoeNaviMap(mapCanvas, self.indoorMap);
      self.map.initialize();
    });
    setInterval(function() {  self.indoeNaviAPIService.updateMap(self.indoorMap).subscribe(); }, 1000);
  }

  onDeleteSpe(){
    if (this.map?.speNodeSelected != null){
      this.indoorMap.deleteSPE(this.map.speNodeSelected);
      this.map.speNodeSelected = null;
    }
  }
}
