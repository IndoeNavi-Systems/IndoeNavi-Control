import { Component } from '@angular/core';
import { delay } from 'rxjs';
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
  public indoorMap : IndoorMap = new IndoorMap("", "", " ", [], [], 1);

  constructor(public indoeNaviAPIService : IndoeNaviAPIService){}

  ngAfterViewInit() {
    let self = this;

    this.indoeNaviAPIService.getMap().subscribe((indoorMap: IndoorMap) => {
      self.indoorMap = new IndoorMap(indoorMap.id, indoorMap.area, indoorMap.imageData, indoorMap.routeNodes, indoorMap.spes, indoorMap.meterPerPixel);
      let mapImage : any = document.getElementById("mapImage");
      mapImage.src = "data:image/png;base64," + indoorMap.imageData;

      let mapCanvas = <HTMLCanvasElement>document.getElementById("mapCanvas");
      mapCanvas.addEventListener("mapupdated",  (CustomEvent) => { self.saveData(); }, false);
      self.map = new IndoeNaviMap(mapCanvas, self.indoorMap);
      self.map.initialize();
    });
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
