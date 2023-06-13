import { Component } from '@angular/core';
import { IndoeNaviMap } from 'src/app/components/spes/indoe-navi-map';
import { IndoorMap } from 'src/app/models/indoor-map';
import { IndoeNaviAPIService } from 'src/app/services/indoe-navi-api.service';

@Component({
  selector: 'app-spes',
  templateUrl: './spes.component.html',
  styleUrls: ['./spes.component.css']
})
export class SpesComponent {
  public map : IndoeNaviMap | null = null;
  public indoorMap : IndoorMap = new IndoorMap("", "", "", [], [], 1);

  constructor(public indoeNaviAPIService : IndoeNaviAPIService){}

  ngAfterViewInit() {
    let self = this;
    let mapCanvas = <HTMLCanvasElement>document.getElementById("mapCanvas");

    this.indoeNaviAPIService.getMap().subscribe((indoorMap: IndoorMap) => {
      let mapImage : any = document.getElementById("mapImage");
      mapImage.src = "data:image/png;base64," + indoorMap.imageData;

      self.indoorMap = new IndoorMap(indoorMap.id, indoorMap.area, indoorMap.imageData, indoorMap.routeNodes, indoorMap.spes, indoorMap.meterPerPixel);
      self.map = new IndoeNaviMap(mapCanvas, self.indoorMap);
      self.map.initialize();
    });
    mapCanvas.addEventListener("mapupdated",  (CustomEvent) => { self.saveData(); }, false);
  }

  onDeleteSpe(){
    if (this.map?.speNodeSelected != null){
      this.indoorMap.deleteSPE(this.map.speNodeSelected);
      this.map.speNodeSelected = null;
      this.indoeNaviAPIService.updateMap(this.indoorMap).subscribe();
    }
  }

  saveData(){
    this.indoeNaviAPIService.updateMap(this.indoorMap).subscribe();
  }
}
