import { Component } from '@angular/core';
import { IndoeNaviMap } from 'src/app/map/indoe-navi-map';
import { IndoorMap } from 'src/app/models/indoor-map';
import { SPE } from 'src/app/models/spe';

@Component({
  selector: 'app-spes',
  templateUrl: './spes.component.html',
  styleUrls: ['./spes.component.css']
})
export class SpesComponent {
  public map : IndoeNaviMap | null = null;
  public indoorMap = new IndoorMap("Ringsted", "", [], []);

  constructor() { }

  ngAfterViewInit(): void {
    this.map = new IndoeNaviMap(<HTMLCanvasElement>document.getElementById("mapCanvas"), this.indoorMap);
    this.map.initialize();
  }

  onDeleteSpe(){
    console.log("Works");
    if (this.map?.speNodeSelected != null){
      this.indoorMap.deleteSPE(this.map.speNodeSelected.id);
      this.map.speNodeSelected = null;
    }
  }
}
