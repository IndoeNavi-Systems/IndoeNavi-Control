import { Component } from '@angular/core';
import { IndoeNaviAPIService } from 'src/app/services/indoe-navi-api.service';
import { Buffer } from "buffer";
import { IndoorMap } from 'src/app/models/indoor-map';

@Component({
  selector: 'app-map-settings',
  templateUrl: './map-settings.component.html',
  styleUrls: ['./map-settings.component.css']
})
export class MapSettingsComponent {
  constructor(public indoeNaviAPIService : IndoeNaviAPIService){}

  ngAfterViewInit(): void {
    let self = this;
    this.indoeNaviAPIService.getMap().subscribe((indoorMap: IndoorMap) => {
      self.updateMapImage(indoorMap.imageData);
    });
  }

  onImageUploaded(event : any){
    const reader = new FileReader()
    reader.onload = handleFileLoad;
    reader.readAsBinaryString(event.target.files[0])
    
    let self = this;
    function handleFileLoad(event : any){
      let imageDataBase64 : string = Buffer.from(event.target.result, 'binary').toString('base64');
      
      self.indoeNaviAPIService.getMap().subscribe((indoorMap: IndoorMap) => {
        indoorMap.imageData = imageDataBase64;
        self.indoeNaviAPIService.updateMap(indoorMap).subscribe();
        self.updateMapImage(indoorMap.imageData);
      });
    }
  }
  
  onOpenFileExplore(){
    document.getElementById('fileInput')?.click()
  }

  onRemoveMap(){
    let self = this;
    self.indoeNaviAPIService.getMap().subscribe((indoorMap: IndoorMap) => {
      indoorMap.imageData = "";
      self.indoeNaviAPIService.updateMap(indoorMap).subscribe();
      self.updateMapImage(indoorMap.imageData);
    });
  }

  updateMapImage(imageData : string){
    let mapImage : any = document.getElementById("mapImage");
    mapImage.src = "data:image/png;base64," + imageData;
  }
}
